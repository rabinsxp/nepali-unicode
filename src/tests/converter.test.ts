// Test cases for Nepali Unicode Converter
import { nepaliConverter } from "../utils/nepaliConverter";

const testCases = [
  { input: "namaste", expected: "नमस्ते" },
  { input: "dhanyabad", expected: "धन्यबाद" },
  { input: "kathmandu", expected: "काठमाडौं" },
  { input: "nepal", expected: "नेपाल" },
  { input: "mero naam", expected: "मेरो नाम" },
  { input: "gyan", expected: "ज्ञान" },
  { input: "krishna", expected: "कृष्ण" },
  { input: "shrestha", expected: "श्रेष्ठ" },
  { input: "ma", expected: "म" },
  { input: "timro", expected: "तिम्रो" },
  { input: "kasto", expected: "कस्तो" },
];

const simplifiedTests = [
  { input: "mero nam", expected: "मेरो नाम" }, // Should work in simplified mode
  { input: "mero naam", expected: "मेरो नाम" },
  { input: "tim", expected: "तिम" },
  { input: "timi", expected: "तिमि" },
];

export const runTests = () => {
  console.log("Running Nepali Unicode Converter Tests...\n");

  console.log("=== BASIC TESTS ===");
  testCases.forEach((testCase, index) => {
    const result = nepaliConverter.convert(testCase.input);
    const passed = result === testCase.expected;

    console.log(`Test ${index + 1}: ${passed ? "✅ PASS" : "❌ FAIL"}`);
    console.log(`Input: "${testCase.input}"`);
    console.log(`Expected: "${testCase.expected}"`);
    console.log(`Got: "${result}"`);
    console.log("---");
  });

  console.log("\n=== SIMPLIFIED MODE TESTS ===");
  simplifiedTests.forEach((testCase, index) => {
    const result = nepaliConverter.convert(testCase.input, "simplified");
    const passed = result === testCase.expected;

    console.log(
      `Simplified Test ${index + 1}: ${passed ? "✅ PASS" : "❌ FAIL"}`
    );
    console.log(`Input: "${testCase.input}"`);
    console.log(`Expected: "${testCase.expected}"`);
    console.log(`Got: "${result}"`);
    console.log("---");
  });
};

// Run tests in development mode
if (typeof window !== "undefined") {
  runTests();
}
