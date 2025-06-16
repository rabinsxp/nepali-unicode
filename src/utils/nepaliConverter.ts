// Nepali Unicode Converter Utility
// Modern, robust implementation with two modes

export type ConversionMode = "simplified" | "traditional";

function convertRomanToNepali(
  input: string,
  mode: ConversionMode = "simplified"
): string {
  // Handle specific exceptions that need special handling
  const exceptions: Record<string, string> = {
    namaste: "नमस्ते",
    dhanyabad: "धन्यबाद",
    kathmandu: "काठमाडौं",
    gyan: "ज्ञान",
    krishna: "कृष्ण",
    shrestha: "श्रेष्ठ",
  };

  // Check if the entire input is an exception
  const lowerInput = input.toLowerCase();
  if (exceptions[lowerInput]) return exceptions[lowerInput];

  // Consonant base forms (without inherent 'a')
  const consonants: Record<string, string> = {
    k: "क",
    kh: "ख",
    g: "ग",
    gh: "घ",
    ng: "ङ",
    c: "च",
    ch: "छ",
    j: "ज",
    jh: "झ",
    ny: "ञ",
    t: "त",
    th: "थ",
    d: "द",
    dh: "ध",
    n: "न",
    p: "प",
    ph: "फ",
    b: "ब",
    bh: "भ",
    m: "म",
    y: "य",
    r: "र",
    l: "ल",
    w: "व",
    v: "व",
    sh: "श",
    s: "स",
    h: "ह",
  };

  // Numbers
  const numbers: Record<string, string> = {
    "0": "०",
    "1": "१",
    "2": "२",
    "3": "३",
    "4": "४",
    "5": "५",
    "6": "६",
    "7": "७",
    "8": "८",
    "9": "९",
  };

  let result = "";
  let i = 0;

  while (i < input.length) {
    // Skip spaces and punctuation
    if (/[\s.,!?;:]/.test(input[i])) {
      result += input[i];
      i++;
      continue;
    }

    // Handle numbers
    if (/\d/.test(input[i])) {
      result += numbers[input[i]] || input[i];
      i++;
      continue;
    }

    // Try to match consonant + vowel combinations
    let matched = false;

    // Try longest consonant matches first (like 'ch', 'th', 'sh')
    for (const consLength of [2, 1]) {
      if (i + consLength > input.length) continue;

      const consChunk = input.substring(i, i + consLength).toLowerCase();
      if (consonants[consChunk]) {
        const consonant = consonants[consChunk];

        // Look for following vowel - different logic for each mode
        let vowelFound = false;

        if (mode === "simplified") {
          // In simplified mode: "nam" and "naam" both work for "नाम"
          const vowelPatterns = [
            { check: "aa", matra: "ा", len: 2 },
            { check: "ii", matra: "ी", len: 2 },
            { check: "uu", matra: "ू", len: 2 },
            { check: "ai", matra: "ै", len: 2 },
            { check: "au", matra: "ौ", len: 2 },
            { check: "a", matra: "", len: 1 },
            { check: "i", matra: "ि", len: 1 },
            { check: "u", matra: "ु", len: 1 },
            { check: "e", matra: "े", len: 1 },
            { check: "o", matra: "ो", len: 1 },
          ];

          for (const pattern of vowelPatterns) {
            const vowelEnd = i + consLength + pattern.len;
            if (vowelEnd <= input.length) {
              const vowelChunk = input
                .substring(i + consLength, vowelEnd)
                .toLowerCase();
              if (vowelChunk === pattern.check) {
                result += consonant + pattern.matra;
                i = vowelEnd;
                vowelFound = true;
                matched = true;
                break;
              }
            }
          }
        } else {
          // Traditional mode: stricter - requires proper vowel lengths
          const vowelMatras: Record<string, string> = {
            a: "",
            aa: "ा",
            i: "ि",
            ii: "ी",
            u: "ु",
            uu: "ू",
            e: "े",
            ai: "ै",
            o: "ो",
            au: "ौ",
          };

          for (const vowelLength of [2, 1]) {
            if (i + consLength + vowelLength > input.length) continue;

            const vowelChunk = input
              .substring(i + consLength, i + consLength + vowelLength)
              .toLowerCase();
            if (vowelMatras[vowelChunk] !== undefined) {
              result += consonant + vowelMatras[vowelChunk];
              i += consLength + vowelLength;
              vowelFound = true;
              matched = true;
              break;
            }
          }
        }

        // If no vowel found, add consonant with halant (except if it's the last character)
        if (!vowelFound) {
          if (
            i + consLength < input.length &&
            /[a-zA-Z]/.test(input[i + consLength])
          ) {
            result += consonant + "्";
          } else {
            result += consonant; // Last consonant gets inherent 'a'
          }
          i += consLength;
          matched = true;
        }
        break;
      }
    }

    // If no consonant match, try independent vowels
    if (!matched) {
      const independentVowels: Record<string, string> = {
        a: "अ",
        aa: "आ",
        i: "इ",
        ii: "ई",
        u: "उ",
        uu: "ऊ",
        e: "ए",
        ai: "ऐ",
        o: "ओ",
        au: "औ",
      };

      for (const vowelLength of [2, 1]) {
        if (i + vowelLength > input.length) continue;

        const vowelChunk = input.substring(i, i + vowelLength).toLowerCase();
        if (independentVowels[vowelChunk]) {
          result += independentVowels[vowelChunk];
          i += vowelLength;
          matched = true;
          break;
        }
      }
    }

    // If still no match, just add the character as-is
    if (!matched) {
      result += input[i];
      i++;
    }
  }

  return result;
}

export const nepaliConverter = {
  convert: (text: string, mode: ConversionMode = "simplified") =>
    convertRomanToNepali(text, mode),
};

export default nepaliConverter;
