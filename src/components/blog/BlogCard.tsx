import { Link } from "react-router-dom";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { BlogPost } from "../../types/blog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="group h-full flex flex-col overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300">
      <Link to={`/blogs/${post.slug}`} className="relative block aspect-[16/9] overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
          {post.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-white/90 dark:bg-black/90 text-xs shadow-sm">
              {tag}
            </Badge>
          ))}
        </div>
      </Link>
      
      <CardContent className="p-6 flex flex-col flex-1 bg-white dark:bg-zinc-950">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readTime}</span>
          </div>
        </div>

        <Link to={`/blogs/${post.slug}`}>
          <h3 className="text-xl font-semibold mb-3 leading-tight text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-1 line-clamp-3">
          {post.excerpt}
        </p>

        <Link
          to={`/blogs/${post.slug}`}
          className="inline-flex items-center text-primary font-medium text-sm hover:opacity-80 transition-opacity mt-auto w-fit"
        >
          Read More
          <ArrowRight className="ml-1.5 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardContent>
    </Card>
  );
}
