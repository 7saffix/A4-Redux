import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-background text-muted-foreground py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-4">LibraryMS</h3>
          <p className="text-sm">
            LibraryMS is your go-to platform to discover, read, and share
            amazing books. Connect with authors and fellow readers worldwide.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/books" className="hover:text-primary">
                all books
              </Link>
            </li>
            <li>
              <Link to="/add-book" className="hover:text-primary">
                add book
              </Link>
            </li>
            <li>
              <Link to="/borrow-summary" className="hover:text-primary">
                borrow summary
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Newsletter</h3>
          <p className="text-sm mb-3">
            Subscribe to get updates on new books and authors.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded border border-muted-foreground/50 w-full text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button size="sm">Subscribe</Button>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-muted-foreground/20 pt-6 text-center text-sm">
        &copy; {new Date().getFullYear()} LibraryMS. All rights reserved.
      </div>
    </footer>
  );
}
