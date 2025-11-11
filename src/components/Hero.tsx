import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Hero() {
  return (
    <section className="relative flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 py-20  from-background to-muted/30 overflow-hidden">
      {/* Left content */}
      <div className="text-center md:text-left md:w-1/2 space-y-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Discover the World of <span className="text-primary">Books</span>
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto md:mx-0">
          Explore thousands of books, expand your knowledge, and dive into
          stories that inspire, educate, and entertain — all in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
          <Button size="lg">
            <Link to={"/books"}>Browse Library</Link>
          </Button>
          <Button size="lg" variant="outline">
            <Link to={"/borrow-summary"}>Borrow summary</Link>
          </Button>
        </div>
      </div>

      <div className="md:w-1/2 mb-10 md:mb-0 flex justify-center">
        <img
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80"
          alt="Hero Illustration"
          className="w-[280px] sm:w-[380px] lg:w-[450px] drop-shadow-xl"
        />
      </div>
    </section>
  );
}
