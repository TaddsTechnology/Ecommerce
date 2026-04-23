'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight, ZoomIn, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductImageCarouselProps {
    images: Array<{
        id: string;
        preview: string;
        source: string;
    }>;
}

export function ProductImageCarousel({ images }: ProductImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const mainImageRef = useRef<HTMLDivElement>(null);
    const thumbnailRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (containerRef.current) {
            gsap.fromTo(containerRef.current, 
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
            );
        }
    }, { scope: containerRef });

    useGSAP(() => {
        if (mainImageRef.current) {
            gsap.fromTo(mainImageRef.current,
                { opacity: 0, scale: 0.98 },
                { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
            );
        }
    }, { scope: mainImageRef, dependencies: [currentIndex] });

    if (!images || images.length === 0) {
        return (
            <div className="aspect-square bg-muted rounded-xl flex items-center justify-center">
                <span className="text-muted-foreground">No images available</span>
            </div>
        );
    }

    const goToPrevious = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToNext = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const handleThumbnailScroll = (direction: 'left' | 'right') => {
        if (thumbnailRef.current) {
            const scrollAmount = 80;
            thumbnailRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isZoomed) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
    };

    const openLightbox = () => setIsLightboxOpen(true);
    const closeLightbox = () => setIsLightboxOpen(false);

    return (
        <div ref={containerRef} className="space-y-4">
            {/* Main Image with Zoom */}
            <div 
                className="relative aspect-square bg-muted rounded-xl overflow-hidden group cursor-zoom-in"
                ref={mainImageRef}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
                onClick={openLightbox}
            >
                <div className={`w-full h-full transition-transform duration-300 ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}>
                    <Image
                        src={images[currentIndex].source}
                        alt={`Product image ${currentIndex + 1}`}
                        fill
                        className={`object-cover transition-transform duration-300 ${
                            isZoomed ? 'scale-150' : 'scale-100'
                        }`}
                        style={isZoomed ? {
                            transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                        } : undefined}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority={currentIndex === 0}
                    />
                </div>

                {/* Zoom Icon Indicator */}
                <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-5 h-5" />
                </div>

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background shadow-sm opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                            onClick={(e) => { e.stopPropagation(); goToPrevious(e); }}
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background shadow-sm opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                            onClick={(e) => { e.stopPropagation(); goToNext(e); }}
                        >
                            <ChevronRight className="h-5 w-5" />
                        </Button>
                    </>
                )}

                {/* Image Counter */}
                {images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                        {currentIndex + 1} / {images.length}
                    </div>
                )}
            </div>

            {/* Thumbnail Strip - Horizontal Scroll */}
            {images.length > 1 && (
                <div className="relative">
                    {/* Left Scroll Button */}
                    {images.length > 4 && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background shadow-sm rounded-full"
                            onClick={() => handleThumbnailScroll('left')}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    )}

                    {/* Thumbnails Scroll Container */}
                    <div 
                        ref={thumbnailRef}
                        className="flex gap-2 overflow-x-auto scrollbar-hide py-1 px-1"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {images.map((image, index) => (
                            <button
                                key={image.id}
                                onClick={() => setCurrentIndex(index)}
                                className={`flex-shrink-0 w-20 h-20 relative rounded-lg overflow-hidden transition-all duration-200 ${
                                    index === currentIndex
                                        ? 'ring-2 ring-primary ring-offset-2'
                                        : 'ring-1 ring-border hover:ring-muted-foreground opacity-70 hover:opacity-100'
                                }`}
                            >
                                <Image
                                    src={image.preview}
                                    alt={`Thumbnail ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="80px"
                                />
                            </button>
                        ))}
                    </div>

                    {/* Right Scroll Button */}
                    {images.length > 4 && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background shadow-sm rounded-full"
                            onClick={() => handleThumbnailScroll('right')}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            )}

            {/* Lightbox Modal */}
            {isLightboxOpen && (
                <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
                    {/* Close Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full z-10"
                        onClick={closeLightbox}
                    >
                        <X className="h-6 w-6" />
                    </Button>

                    {/* Main Lightbox Image */}
                    <div className="relative w-full h-full max-w-5xl max-h-[90vh] p-4">
                        <Image
                            src={images[currentIndex].source}
                            alt={`Product image ${currentIndex + 1}`}
                            fill
                            className="object-contain"
                            sizes="100vw"
                        />
                    </div>

                    {/* Navigation */}
                    {images.length > 1 && (
                        <>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full h-12 w-12"
                                onClick={goToPrevious}
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full h-12 w-12"
                                onClick={goToNext}
                            >
                                <ChevronRight className="h-6 w-6" />
                            </Button>
                        </>
                    )}

                    {/* Thumbnail Strip in Lightbox */}
                    {images.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 p-2 rounded-lg">
                            {images.map((image, index) => (
                                <button
                                    key={image.id}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`flex-shrink-0 w-16 h-16 relative rounded overflow-hidden transition-all ${
                                        index === currentIndex
                                            ? 'ring-2 ring-white'
                                            : 'opacity-50 hover:opacity-100'
                                    }`}
                                >
                                    <Image
                                        src={image.preview}
                                        alt={`Thumbnail ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="64px"
                                    />
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Counter */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full text-white text-sm">
                        {currentIndex + 1} / {images.length}
                    </div>
                </div>
            )}

            <style jsx global>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}