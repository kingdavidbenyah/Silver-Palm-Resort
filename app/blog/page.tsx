"use client";

import { PageHeader } from "@/components/pageHeader";
import BlogPosts from "@/public/data/blog-posts.json";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";

import { Calendar, User, Eye, Heart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function BlogPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const introCards = [
    {
      title: "Culinary Delights",
      description: "Savor the flavours of paradise",
      image:
        "https://i.pinimg.com/1200x/33/23/c4/3323c4dc60d03f54f2490d8fa9bb3d62.jpg",
    },
    {
      title: "Travel & Culture",
      description: "Cultural experiences that makes every trip unforgettable",
      image:
        "https://i.pinimg.com/736x/cb/79/54/cb7954fd53071d04d39fdb8f751c1ee4.jpg",
    },
    {
      title: "Social Life",
      description: "Enjoy your social life together",
      image:
        "https://i.pinimg.com/736x/75/d7/91/75d791513b8397f9a23f98728ffc6d68.jpg",
    },
  ];

  // Extract unique categories with counts
  const categories = useMemo(() => {
    const categoryMap: { [key: string]: number } = {};
    BlogPosts.forEach((post) => {
      post.category.forEach((cat) => {
        categoryMap[cat] = (categoryMap[cat] || 0) + 1;
      });
    });
    return Object.entries(categoryMap).map(([name, count]) => ({
      name,
      count,
    }));
  }, []);

  // Extract unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    BlogPosts.forEach((post) => {
      post.category.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }, []);

  // Get popular posts (top 3 by views)
  const popularPosts = useMemo(() => {
    return [...BlogPosts].sort((a, b) => b.views - a.views).slice(0, 3);
  }, []);

  // Filter posts based on selected category or tag
  const filteredPosts = useMemo(() => {
    let filtered = BlogPosts;

    if (selectedCategory) {
      filtered = filtered.filter((post) =>
        post.category.includes(selectedCategory)
      );
    }

    if (selectedTag) {
      filtered = filtered.filter((post) => post.category.includes(selectedTag));
    }

    return filtered;
  }, [selectedCategory, selectedTag]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedTag]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setSelectedTag(null);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
    setSelectedCategory(null);
  };

  const formatDate = (dateString: string) => {
    return dateString;
  };

  return (
    <main className="min-h-screen">
      <PageHeader
        header="Stories from Paradise"
        subText="Journey through inspiring tales, travel insights, and lifestyle tips from the heart of Silver Palm Resort — where every day feels like a getaway."
        image="https://i.pinimg.com/1200x/71/65/48/716548a1341f98137fa0dfeaf3bffa15.jpg"
        imgClassName="bg-[50%_42%]"
        headerHeight="h-[700px] xl:h-[780px]"
      />

      {/* Intro Cards */}
      <section className="container-wide section-padding-sm flex flex-col lg:flex-row justify-center items-center gap-10">
        {introCards.map((card, index: number) => (
          <motion.div
            key={index}
            className="relative w-full sm:w-[550px] md:w-[650px] h-[270px] sm:h-[320px] md:h-[350px] lg:w-[290px] lg:h-[180px] overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ y: -10 }}
          >
            <Image
              src={card.image}
              alt={card.title}
              width={290}
              height={180}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 h-4/5 w-[85%] z-10 bg-[var(--blog-intro-cards-overlay)] mx-auto my-auto flex-center">
              <ul className="text-neutral-10 space-y-4 lg:max-w-[220px] px-2 lg:px-0 py-7 text-center">
                <li className="text-subHeadingRegular font-medium uppercase">
                  {card.title}
                </li>
                <li className="w-4/5 h-[1px] mx-auto bg-neutral-10"></li>
                <li className="text-bodySmall">{card.description}</li>
              </ul>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Main Blog Section */}
      <section className="container-wide section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[410px_1fr] gap-10">
          {/* Sidebar - Left Side */}
          <aside className=" order-2 lg:order-1 border border-[var(--testimonial-border)] py-10 px-3 md:px-6">
            {/* Search Bar */}
            <div className="relative max-w-[290px] mx-auto">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--minor-text)]" />
              <input
                type="text"
                placeholder="Search posts..."
                className="text-navRegular w-full pl-14 pr-5 py-3 bg-neutral-30 rounded-full text-neutral-90 placeholder:text-[var(--minor-text)] focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
              />
            </div>

            {/* Popular Posts */}
            <div className="mt-9 space-y-9 py-9 border-t border-[var(--testimonial-border)]">
              <h3 className="text-bodyRegular font-semibold text-primary border-l-2 rounded-l-[5px] p-[15px]">
                Popular Posts
              </h3>
              <div className="space-y-8">
                {popularPosts.map((post, idx) => (
                  <div
                    key={idx}
                    className="flex-center gap-7 group cursor-pointer"
                  >
                    <div className="relative w-[100px] h-[72px] flex-shrink-0 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 space-y-[10px]">
                      <h4 className="text-sm font-medium text-[var(--major-text)] group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-xs text-[var(--minor-text)]">
                        {formatDate(post.date)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-9 py-9 border-t border-[var(--testimonial-border)]">
              <h3 className="text-bodyRegular font-semibold text-primary border-l-2 rounded-l-[5px] p-[15px]">
                Categories
              </h3>
              <div className="space-y-3 px-3 max-h-[325px] overflow-y-auto">
                {categories.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCategoryClick(cat.name)}
                    className={`cursor-pointer group w-full flex items-center justify-between py-4 sm:py-[18px] transition-all border-b border-dashed  ${
                      selectedCategory === cat.name
                        ? " border-primary"
                        : "border-[var(--testimonial-border)] hover:border-primary"
                    }`}
                  >
                    <span
                      className={`text-bodySmall ${
                        selectedCategory === cat.name
                          ? " text-primary"
                          : "text-[var(--major-text)] group-hover:text-primary"
                      }`}
                    >
                      {cat.name}
                    </span>
                    <span
                      className={`text-navRegular ${
                        selectedCategory === cat.name
                          ? "text-primary"
                          : " text-[var(--minor-text)] group-hover:text-primary"
                      }`}
                    >
                      {cat.count.toString().padStart(2, "0")}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tag Clouds */}
            <div className="space-y-9 py-9 border-t border-[var(--testimonial-border)]">
              <h3 className="text-bodyRegular font-semibold text-primary border-l-2 rounded-l-[5px] p-[15px]">
                Tag Clouds
              </h3>
              <div className="flex flex-wrap gap-[10px]">
                {allTags.map((tag, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTagClick(tag)}
                    className={`${
                      selectedTag === tag
                        ? "border-primary text-primary"
                        : "border-neutral-60 hover:border-primary hover:text-primary"
                    } cursor-pointer text-caption text-[var(--major-text)] transition-colors duration-300 px-5 py-1.5 border tracking-wider capitalize`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Blog Posts - Right Side */}
          <div className="space-y-8 order-1 lg:order-2 ">
            {/* Post Count */}
            <div className="flex justify-end items-center">
              <p className=" text-bodyRegular text-primary font-medium p-[10px]  border-r-2 rounded-r-[5px] ">
                Showing {filteredPosts.length} posts
              </p>
            </div>

            <section className=" grid grid-cols-1 space-y-20">
              {currentPosts.map((post, index) => (
                <motion.article
                  key={index}
                  className="flex flex-col md:flex-row items-start gap-[15px] mx-auto"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="order-2 md:order-1 space-y-[30px] max-w-[450px]">
                    <div className="order-2 md:order-1 w-full max-h-[200px] overflow-hidden sm:max-h-[250px]">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={450}
                        height={250}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <div className="space-y-6">
                      <p className="text-lg sm:text-xl md:text-2xl font-semibold text-[var(--major-text)]">
                        {post.title}
                      </p>
                      <p className="text-bodySmall text-[var(--minor-text)]">
                        {post.description}
                      </p>
                      <Button variant="primary" size="lg">
                        Read More
                      </Button>
                    </div>
                  </div>

                  <div className="w-[80%] md:w-auto order-1 md:order-2 text-[var(--minor-text)] text-bodySmall space-y-[8px]">
                    <ul>
                      {post.category.map((cat, catIndex) => (
                        <span
                          key={catIndex}
                          className="text-[var(--major-text)] text-bodySmall"
                        >
                          {cat}
                          {catIndex !== post.category.length - 1 && ", "}{" "}
                        </span>
                      ))}
                    </ul>
                    <ul className="flex justify-between md:flex-col space-x-[15px] space-y-[8px]">
                      <ul className="space-y-[8px]">
                        <ul className="flex items-center gap-[10px]">
                          <User className="w-5 h-5 text-[var(--major-text)]" />
                          <li>{post.author}</li>
                        </ul>
                        <ul className="flex items-center gap-[10px]">
                          <Calendar className="w-5 h-5 text-[var(--major-text)]" />
                          <li>{post.date}</li>
                        </ul>
                      </ul>
                      <ul className="space-y-[8px]">
                        <ul className="flex items-center gap-[10px]">
                          <Eye className="w-5 h-5 text-[var(--major-text)]" />
                          <li>{post.views}</li>
                        </ul>
                        <ul className="flex items-center gap-[10px]">
                          <Heart className="w-5 h-5 text-[var(--major-text)]" />
                          <li>{post.likes}</li>
                        </ul>
                      </ul>
                    </ul>
                  </div>
                </motion.article>
              ))}
            </section>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center lg:justify-start gap-4 pt-8">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="cursor-pointer text-[var(--major-text)] hover:text-primary hover:scale-105 transition-all disabled:opacity-30 disabled:text-[var(--major-text)] disabled:scale-100 disabled:cursor-not-allowed"
                >
                  <BsChevronLeft className="w-5 h-5" />
                </button>

                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`cursor-pointer w-10 h-10 flex items-center justify-center font-medium transition-all ${
                      currentPage === idx + 1
                        ? "bg-primary text-neutral-10"
                        : "text-[var(--minor-text)] hover:bg-primary/10"
                    }`}
                  >
                    {(idx + 1).toString().padStart(2, "0")}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="cursor-pointer text-[var(--major-text)] hover:text-primary hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <BsChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
