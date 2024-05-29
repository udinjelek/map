import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagePreloaderService {
  private images: string[] = [];

  preloadImages(imageUrls: string[]): void {
    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
      this.images.push(url);
    });
  }

  getImageUrls(): string[] {
    return this.images;
  }
}