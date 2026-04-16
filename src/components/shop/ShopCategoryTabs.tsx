"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductGrid } from "./ProductGrid"
import { CategoryHero } from "./CategoryHero"
import { SHOP_CATEGORIES } from "@/lib/constants"
import { getProductsByCategory } from "@/data/products"

export function ShopCategoryTabs() {
  return (
    <Tabs defaultValue="fiction" className="w-full">
      <div className="bg-brand-parchment border-b border-brand-greige/60 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TabsList className="h-auto bg-transparent p-0 gap-0 w-full justify-start overflow-x-auto">
            {SHOP_CATEGORIES.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-brand-cream data-[state=active]:border-b-2 data-[state=active]:border-brand-gold rounded-none px-5 py-4 text-sm font-medium text-brand-stone hover:text-brand-cream transition-colors border-b-2 border-transparent whitespace-nowrap"
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </div>

      {SHOP_CATEGORIES.map((cat) => (
        <TabsContent key={cat.id} value={cat.id} className="mt-0">
          <CategoryHero title={cat.label} tagline={cat.tagline} />
          <div className="bg-brand-parchment py-section">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ProductGrid products={getProductsByCategory(cat.id)} columns={3} />
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
