import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { NFT_BOXES } from '../mock';

const NFTCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="w-full py-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="w-6 h-6 text-gold-400 animate-pulse" />
          <h2 className="text-4xl md:text-5xl font-bold text-white">Explore DogeFood Flavors</h2>
          <Sparkles className="w-6 h-6 text-gold-400 animate-pulse" />
        </div>
        <p className="text-white/70 text-lg">Only 420 boxes will ever exist</p>
      </div>

      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {NFT_BOXES.map((box) => (
              <div
                key={box.id}
                className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-3"
              >
                <div className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl p-6 border-2 border-white/10 hover:border-gold-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gold-400/20">
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-gold-400 to-amber-500 text-slate-900 text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                    {box.tier}
                  </div>
                  
                  <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                    <img
                      src={box.image}
                      alt={box.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white">{box.name}</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-white/60">Secret Ingredient:</span>
                      <span className="text-gold-400 font-medium">{box.secretIngredient}</span>
                    </div>
                    <p className="text-white/50 text-sm">{box.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={scrollPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-slate-800 border-2 border-white/20 text-white shadow-xl z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        <Button
          onClick={scrollNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-slate-800 border-2 border-white/20 text-white shadow-xl z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {NFT_BOXES.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? 'bg-gold-400 w-8'
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default NFTCarousel;