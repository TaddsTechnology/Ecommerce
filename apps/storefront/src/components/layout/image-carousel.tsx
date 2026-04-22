"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface CarouselSlide {
  image: string;
  title: string;
  description: string;
}

const slides: CarouselSlide[] = [
  {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=800&fit=crop",
    title: "Premium Quality",
    description: "Crafted with the finest materials for lasting excellence",
  },
  {
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&h=800&fit=crop",
    title: "Best Prices",
    description: "Unbeatable value without compromising on quality",
  },
  {
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1600&h=800&fit=crop",
    title: "Fast Delivery",
    description: "Quick and reliable shipping to your doorstep",
  },
];

export function ImageCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section className="py-16 bg-white">
      <div className="relative">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          opts={{
            loop: true,
            align: "start",
          }}
        >
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index} className="relative h-[60vh] md:h-[70vh]">
                <div className="absolute inset-0">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
                </div>
                <div className="relative h-full flex items-center">
                  <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-xl">
                      <h2 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tight mb-4">
                        {slide.title}
                      </h2>
                      <p className="text-lg md:text-xl text-white/90 font-medium">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
