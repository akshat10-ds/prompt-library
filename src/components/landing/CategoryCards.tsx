'use client';

import { categories, prompts } from '@/data';
import { CategoryCard } from './CategoryCard';

export function CategoryCards() {
  const counts = categories.reduce((acc, cat) => {
    acc[cat.id] = prompts.filter(p => p.category === cat.id).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <section className="py-12 px-6 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-3">
            Browse by Category
          </h2>
          <p className="text-text-secondary">
            Find prompts tailored to your workflow
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              count={counts[category.id]}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
