// This file provides a fallback for the cover photo
// You can replace this with an actual image file later

// Export a gradient background style that can be used instead of an image
export const coverPhotoGradient = 'linear-gradient(to right, #1877f2, #0ea5e9)';

// Export a function to get a random gradient (for visual variety)
export const getRandomCoverGradient = () => {
  const gradients = [
    'linear-gradient(to right, #1877f2, #0ea5e9)',
    'linear-gradient(to right, #4f46e5, #7e22ce)',
    'linear-gradient(to right, #059669, #0d9488)',
    'linear-gradient(to right, #d946ef, #ec4899)',
    'linear-gradient(to right, #f59e0b, #ef4444)',
  ];

  return gradients[Math.floor(Math.random() * gradients.length)];
};
