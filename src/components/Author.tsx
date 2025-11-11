import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";

const authors = [
  {
    name: "J.K. Rowling",
    description: "Author of the Harry Potter series",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870",
  },
  {
    name: "George R.R. Martin",
    description: "Author of A Song of Ice and Fire",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Agatha Christie",
    description: "Queen of Mystery Novels",
    image:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Stephen King",
    description: "Master of Horror and Suspense",
    image:
      "https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=871",
  },
];

export default function Authors() {
  return (
    <section className="py-16 px-6 md:px-16 bg-background">
      <h2 className="text-3xl font-bold text-center mb-10">Popular Authors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {authors.map((author) => (
          <Card key={author.name} className="py-0 hover:shadow-lg">
            <img
              src={author.image}
              alt={author.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <CardContent className="p-5 space-y-2">
              <CardTitle>{author.name}</CardTitle>
              <CardDescription>{author.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
