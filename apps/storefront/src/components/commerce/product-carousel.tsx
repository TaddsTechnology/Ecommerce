'use client';

import {ProductCard} from "@/components/commerce/product-card";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/components/ui/carousel";
import {FragmentOf} from "@/graphql";
import {ProductCardFragment} from "@/lib/vendure/fragments";

interface ProductCarouselClientProps {
    title: string;
    products: Array<FragmentOf<typeof ProductCardFragment>>;
}

export function ProductCarousel({title, products}: ProductCarouselClientProps) {
    return (
        <section className="py-16 md:py-20">
            <div className="container mx-auto px-4 md:px-8">
                <h2 className="text-4xl md:text-5xl font-bold mb-10 text-[#111111]">{title}</h2>
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                        slidesToScroll: 4,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="gap-4">
                        {products.map((product, i) => (
                            <CarouselItem key={i} className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                <ProductCard product={product}/>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex -left-12 hover:bg-[#111111] hover:text-white" />
                    <CarouselNext className="hidden md:flex -right-12 hover:bg-[#111111] hover:text-white" />
                </Carousel>
            </div>
        </section>
    );
}
