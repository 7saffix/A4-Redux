/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBorrowSummaryQuery } from "@/redux/baseApi/baseApi";
import { Loader2 } from "lucide-react";

const BorrowList = () => {
  const { data, isLoading } = useGetBorrowSummaryQuery(undefined);

  const books = data?.data || [];

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin w-16 h-16 text-gray-700" />
      </div>
    );

  return (
    <>
      <h1 className="text-center font-bold text-2xl my-10">Borrow summary</h1>
      <Table className="w-90% md:w-[70%] m-auto">
        <TableHeader className="text-center">
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Total quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book: any) => (
            <TableRow key={book.book.isbn}>
              <TableCell className="font-medium">{book.book.title}</TableCell>
              <TableCell>{book.book.isbn}</TableCell>
              <TableCell>{book.totalQuantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default BorrowList;
