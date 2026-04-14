import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface ImageGalleryProps {
  images: string[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <div className="my-10">
      <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Gallery
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <Dialog key={idx}>
            <DialogTrigger asChild>
              <div
                className="cursor-pointer group relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800"
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img}
                  alt={`Gallery image ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-5xl w-[90vw] p-1 border-none shadow-2xl bg-black/90 backdrop-blur-sm">
              <div className="relative w-full h-auto aspect-video rounded-md overflow-hidden bg-transparent flex items-center justify-center">
                <img
                  src={selectedImage || img}
                  alt="Full preview"
                  className="max-h-[85vh] max-w-full object-contain"
                />
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
