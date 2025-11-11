/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  useBorrowBookMutation,
  useDeleteBookMutation,
  useGetBooksQuery,
  useUpdateBookMutation,
} from "@/redux/baseApi/baseApi";
import type { IBook } from "@/types";
import { format } from "date-fns";
import { CalendarIcon, Edit, Loader2, Trash } from "lucide-react";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function AllBooks() {
  const { data, isLoading } = useGetBooksQuery(undefined);
  const [deleteBook, { isLoading: deleting }] = useDeleteBookMutation();
  const [updateBook, { isLoading: updating }] = useUpdateBookMutation();
  const [borrowBook, { isLoading: borrowing }] = useBorrowBookMutation();

  const [borrowOpen, setBorrowOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);

  const form = useForm();
  const navigate = useNavigate();

  const books = data?.data || [];

  const handleBorrowDialog = (book: IBook) => {
    setSelectedBook(book);
    setBorrowOpen(true);
  };

  const handleBorrow: SubmitHandler<FieldValues> = async (data) => {
    try {
      const payload = {
        book: selectedBook?._id,
        quantity: Number(data.quantity),
        dueDate: new Date(data.dueDate),
      };

      const res = await borrowBook(payload).unwrap();
      toast.success(res.message);
      navigate("/borrow-summary");
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to borrow book");
    }
  };

  const handleUpdateDialog = (book: IBook) => {
    setSelectedBook(book);
    form.reset({
      title: book.title,
      author: book.author,
      genre: book.genre,
      isbn: book.isbn,
      available: book.available ? "true" : "false",
      copies: book.copies,
    });
    setEditOpen(true);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const updatedData = {
        ...data,
        available: data.available === "true",
        copies: Number(data.copies),
      };
      const res = await updateBook({
        id: selectedBook?._id,
        data: updatedData,
      }).unwrap();

      toast.success(res.message);
      setEditOpen(false);
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to update book");
    }
  };

  const handleDeleteDialog = (book: IBook) => {
    setSelectedBook(book);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteBook(selectedBook?._id).unwrap();
      setDeleteOpen(false);
      toast.success("book deleted successfully");
    } catch (error) {
      toast.error("Failed to delete book");
      setDeleteOpen(false);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin w-16 h-16 text-gray-700" />
      </div>
    );

  return (
    <>
      <h1 className="text-center my-12 text-2xl font-bold">
        A list of books, Expand your knowledge.
      </h1>
      <Table className="w-[90%] m-auto">
        <TableHeader className="text-center">
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>genre</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Available</TableHead>
            <TableHead>Copies</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book: IBook) => (
            <TableRow key={book.isbn}>
              <TableCell className="font-medium">{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.available ? "Yes" : "No"}</TableCell>
              <TableCell>{book.copies}</TableCell>
              <TableCell className="flex space-x-1">
                <Button
                  onClick={() => handleBorrowDialog(book)}
                  variant={"outline"}
                  className="cursor-pointer hover:bg-black hover:text-white"
                >
                  Borrow
                </Button>
                <Button
                  onClick={() => handleUpdateDialog(book)}
                  className="bg-yellow-600 cursor-pointer"
                >
                  <Edit />
                </Button>
                <Button
                  onClick={() => handleDeleteDialog(book)}
                  variant={"destructive"}
                  className="cursor-pointer"
                >
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            This action will permanently delete the book.
          </DialogDescription>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={deleting}
              className="cursor-pointer"
            >
              {deleting ? <Loader2 className="animate-spin" /> : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Book title" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Author name" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select genre" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="FICTION">Fiction</SelectItem>
                          <SelectItem value="NON_FICTION">
                            Non-Fiction
                          </SelectItem>
                          <SelectItem value="SCIENCE">Science</SelectItem>
                          <SelectItem value="HISTORY">History</SelectItem>
                          <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                          <SelectItem value="FANTASY">Fantasy</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isbn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ISBN</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="ISBN number" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="available"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Availability" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Yes</SelectItem>
                          <SelectItem value="false">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="copies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Copies</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Number of copies" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={updating}>
                  {updating ? <Loader2 className="animate-spin" /> : "Update"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={borrowOpen} onOpenChange={setBorrowOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Borrow book</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleBorrow)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total quantity</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Book title" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Due date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />

              <DialogFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setBorrowOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={borrowing}>
                  {borrowing ? <Loader2 className="animate-spin" /> : "Borrow"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
