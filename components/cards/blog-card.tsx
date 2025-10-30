import Image from "next/image";
import { formatDate } from "../utils/formatDate";
import { Skeleton } from "../ui/skeleton";
import { div } from "framer-motion/client";

interface BlogCardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  image: string;
  blogTitle: string;
  description: string;
  date: string;
  tags?: string[];
  onClick?: () => void;
  isLoading?: boolean;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  image,
  blogTitle,
  description,
  date,
  tags,
  onClick,
  isLoading,
}) => {
  return (
    <div className="grid grid-cols-1 items-start gap-7 max-w-[360px] overflow-hidden">
      {isLoading ? (
        <Skeleton className="h-[260px] w-[360px]" />
      ) : (
        <div className="w-[360px] h-[260px] ">
          <Image src={image} alt={blogTitle} width={360} height={260} className="w-full h-full object-cover object-center"/>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-[10px]">
        {tags
          ? tags.map((tag, index) =>
              isLoading ? (
                <Skeleton key={index} className="w-28 h-5" />
              ) : (
                <p
                  key={index}
                  className="text-caption font-medium text-[var(--major-text)] px-5 py-1.5 border border-neutral-60 tracking-wider capitalize"
                >
                  {tag}
                </p>
              )
            )
          : ""}
      </div>
      <div className="space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="w-3/4 h-5" />
            <div className="space-y-1">
              <Skeleton className="w-[90%] h-2.5" />
              <Skeleton className="w-[90%] h-2.5" />
              <Skeleton className="w-[90%] h-2.5" />
            </div>

            <Skeleton className="w-2/4   h-5" />
          </div>
        ) : (
          <>
            <p className="text-[var(--major-text)] font-medium text-subheadingRegular capitalize ">
              {blogTitle}
            </p>
            <p className="text-bodySmall text-[var(--minor-text)]">
              {description}
            </p>
            <p className="text-[var(--major-text)] font-medium text-bodyRegular">
              {date}
            </p>
          </>
        )}
      </div>
    </div>
  );
};
