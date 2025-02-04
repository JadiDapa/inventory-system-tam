export const numberToWords = (num: number): string => {
  const words = [
    "Nol",
    "Satu",
    "Dua",
    "Tiga",
    "Empat",
    "Lima",
    "Enam",
    "Tujuh",
    "Delapan",
    "Sembilan",
    "Sepuluh",
    "Sebelas",
    "Dua Belas",
    "Tiga Belas",
    "Empat Belas",
    "Lima Belas",
    "Enam Belas",
    "Tujuh Belas",
    "Delapan Belas",
    "Sembilan Belas",
  ];

  if (num < 20) return words[num];
  if (num < 100)
    return `${words[Math.floor(num / 10)]} Puluh ${num % 10 !== 0 ? words[num % 10] : ""}`.trim();

  return num.toString(); // Bisa diperluas untuk angka lebih besar
};
