import { test, expect } from "@playwright/test";
import {
  initializeKidPix,
  setupConsoleErrorMonitoring,
  selectTool,
  getSubtools,
  selectSubtool,
  testCanvasClick,
  assertNoConsoleErrors,
  testToolSwitchingPersistence,
} from "./shared/tool-helpers";
import { getToolDefinition } from "./shared/test-fixtures";

const TOOL_ID = "stamp";
const toolDef = getToolDefinition(TOOL_ID)!;

test.describe("Stamp Tool Tests", () => {
  test.beforeEach(async ({ page }) => {
    await initializeKidPix(page);
  });

  test("basic tool selection and highlighting", async ({ page }) => {
    const consoleErrors = setupConsoleErrorMonitoring(page);
    await selectTool(page, TOOL_ID);
    const subtoolButtons = await getSubtools(page);
    await expect(subtoolButtons.nth(0)).toHaveCSS(
      "border-color",
      "rgb(255, 0, 0)",
    );
    assertNoConsoleErrors(consoleErrors, "tool selection");
  });

  test("stamp functionality", async ({ page }) => {
    const consoleErrors = setupConsoleErrorMonitoring(page);
    await selectTool(page, TOOL_ID);
    const subtoolButtons = await getSubtools(page);
    const subtoolCount = await subtoolButtons.count();

    // Test different stamps
    for (let i = 0; i < Math.min(8, subtoolCount); i++) {
      await selectSubtool(page, i);
      await testCanvasClick(page, {
        x: 80 + (i % 4) * 60,
        y: 80 + Math.floor(i / 4) * 60,
      });
    }
    assertNoConsoleErrors(consoleErrors, "stamp functionality");
  });

  test("tool persistence after switching", async ({ page }) => {
    const consoleErrors = setupConsoleErrorMonitoring(page);
    await selectTool(page, TOOL_ID);
    if (toolDef.alternateSubtoolIndices) {
      await selectSubtool(page, toolDef.alternateSubtoolIndices[0]);
    }
    await testToolSwitchingPersistence(page, TOOL_ID, "truck");
    const subtoolButtons = await getSubtools(page);
    if (toolDef.alternateSubtoolIndices) {
      await expect(
        subtoolButtons.nth(toolDef.alternateSubtoolIndices[0]),
      ).toHaveCSS("border-color", "rgb(255, 0, 0)");
    }
    assertNoConsoleErrors(consoleErrors, "tool persistence");
  });

  test("navigation buttons exist with correct labels", async ({ page }) => {
    const consoleErrors = setupConsoleErrorMonitoring(page);
    await selectTool(page, TOOL_ID);
    const subtoolButtons = await getSubtools(page);
    const subtoolCount = await subtoolButtons.count();

    // Navigation buttons should be at the end (last 4 buttons)
    // Order: prev row, next row, prev stamp pack, next stamp pack
    const prevRowBtn = subtoolButtons.nth(subtoolCount - 4);
    const nextRowBtn = subtoolButtons.nth(subtoolCount - 3);
    const prevPackBtn = subtoolButtons.nth(subtoolCount - 2);
    const nextPackBtn = subtoolButtons.nth(subtoolCount - 1);

    // Verify buttons exist and have correct titles
    await expect(prevRowBtn).toHaveAttribute("title", "prev row");
    await expect(nextRowBtn).toHaveAttribute("title", "next row");
    await expect(prevPackBtn).toHaveAttribute("title", "prev stamp pack");
    await expect(nextPackBtn).toHaveAttribute("title", "next stamp pack");

    assertNoConsoleErrors(consoleErrors, "navigation buttons");
  });

  test("next row navigation works", async ({ page }) => {
    const consoleErrors = setupConsoleErrorMonitoring(page);
    await selectTool(page, TOOL_ID);

    // Get initial row from KiddoPaint.Sprite.page
    const initialRow = await page.evaluate(() => window.KiddoPaint.Sprite.page);

    // Click next row button
    const subtoolButtons = await getSubtools(page);
    const subtoolCount = await subtoolButtons.count();
    const nextRowBtn = subtoolButtons.nth(subtoolCount - 3);
    await nextRowBtn.click();

    // Verify row changed
    const newRow = await page.evaluate(() => window.KiddoPaint.Sprite.page);
    expect(newRow).toBe((initialRow + 1) % 8); // 8 rows total (0-7)

    assertNoConsoleErrors(consoleErrors, "next row navigation");
  });

  test("prev row navigation works", async ({ page }) => {
    const consoleErrors = setupConsoleErrorMonitoring(page);
    await selectTool(page, TOOL_ID);

    // Get initial row from KiddoPaint.Sprite.page
    const initialRow = await page.evaluate(() => window.KiddoPaint.Sprite.page);

    // Click prev row button
    const subtoolButtons = await getSubtools(page);
    const subtoolCount = await subtoolButtons.count();
    const prevRowBtn = subtoolButtons.nth(subtoolCount - 4);
    await prevRowBtn.click();

    // Verify row changed
    const newRow = await page.evaluate(() => window.KiddoPaint.Sprite.page);
    const expectedRow = initialRow === 0 ? 7 : initialRow - 1;
    expect(newRow).toBe(expectedRow);

    assertNoConsoleErrors(consoleErrors, "prev row navigation");
  });

  test("next stamp pack navigation works", async ({ page }) => {
    const consoleErrors = setupConsoleErrorMonitoring(page);
    await selectTool(page, TOOL_ID);

    // Get initial sheet from KiddoPaint.Sprite.sheetPage
    const initialSheet = await page.evaluate(
      () => window.KiddoPaint.Sprite.sheetPage,
    );

    // Click next stamp pack button
    const subtoolButtons = await getSubtools(page);
    const subtoolCount = await subtoolButtons.count();
    const nextPackBtn = subtoolButtons.nth(subtoolCount - 1);
    await nextPackBtn.click();

    // Verify sheet changed
    const newSheet = await page.evaluate(
      () => window.KiddoPaint.Sprite.sheetPage,
    );
    const sheetsLength = await page.evaluate(
      () => window.KiddoPaint.Sprite.sheets.length,
    );
    expect(newSheet).toBe((initialSheet + 1) % sheetsLength);

    assertNoConsoleErrors(consoleErrors, "next stamp pack navigation");
  });

  test("prev stamp pack navigation works", async ({ page }) => {
    const consoleErrors = setupConsoleErrorMonitoring(page);
    await selectTool(page, TOOL_ID);

    // Get initial sheet from KiddoPaint.Sprite.sheetPage
    const initialSheet = await page.evaluate(
      () => window.KiddoPaint.Sprite.sheetPage,
    );

    // Click prev stamp pack button
    const subtoolButtons = await getSubtools(page);
    const subtoolCount = await subtoolButtons.count();
    const prevPackBtn = subtoolButtons.nth(subtoolCount - 2);
    await prevPackBtn.click();

    // Verify sheet changed
    const newSheet = await page.evaluate(
      () => window.KiddoPaint.Sprite.sheetPage,
    );
    const sheetsLength = await page.evaluate(
      () => window.KiddoPaint.Sprite.sheets.length,
    );
    const expectedSheet = initialSheet === 0 ? sheetsLength - 1 : initialSheet - 1;
    expect(newSheet).toBe(expectedSheet);

    assertNoConsoleErrors(consoleErrors, "prev stamp pack navigation");
  });

  test.describe("Stamp Search Bar", () => {
    test("search bar input element exists", async ({ page }) => {
      const consoleErrors = setupConsoleErrorMonitoring(page);
      await selectTool(page, TOOL_ID);

      // Find search input in the submenu
      const searchInput = page.locator(
        '#genericsubmenu input[type="text"][placeholder*="search" i]',
      );
      await expect(searchInput).toBeVisible();

      assertNoConsoleErrors(consoleErrors, "search bar visibility");
    });

    test("typing in search bar filters stamps", async ({ page }) => {
      const consoleErrors = setupConsoleErrorMonitoring(page);
      await selectTool(page, TOOL_ID);

      // Get initial subtool count (should be full grid + nav buttons)
      const initialSubtools = await getSubtools(page);
      const initialCount = await initialSubtools.count();

      // Type search query
      const searchInput = page.locator(
        '#genericsubmenu input[type="text"][placeholder*="search" i]',
      );
      await searchInput.fill("house");

      // Wait for filtering to occur
      await page.waitForTimeout(300); // debounce delay

      // Get filtered subtool count (should be less than initial)
      const filteredSubtools = await getSubtools(page);
      const filteredCount = await filteredSubtools.count();

      // Should show fewer stamps (or equal if "house" matches many)
      // Plus navigation buttons should still be present
      expect(filteredCount).toBeLessThanOrEqual(initialCount);

      assertNoConsoleErrors(consoleErrors, "search filtering");
    });

    test("search is case-insensitive", async ({ page }) => {
      const consoleErrors = setupConsoleErrorMonitoring(page);
      await selectTool(page, TOOL_ID);

      const searchInput = page.locator(
        '#genericsubmenu input[type="text"][placeholder*="search" i]',
      );

      // Search with lowercase
      await searchInput.fill("house");
      await page.waitForTimeout(300);
      const lowercaseResults = await getSubtools(page);
      const lowercaseCount = await lowercaseResults.count();

      // Search with uppercase
      await searchInput.fill("HOUSE");
      await page.waitForTimeout(300);
      const uppercaseResults = await getSubtools(page);
      const uppercaseCount = await uppercaseResults.count();

      // Should return same number of results
      expect(lowercaseCount).toBe(uppercaseCount);

      assertNoConsoleErrors(consoleErrors, "case-insensitive search");
    });

    test("clearing search shows all stamps", async ({ page }) => {
      const consoleErrors = setupConsoleErrorMonitoring(page);
      await selectTool(page, TOOL_ID);

      const searchInput = page.locator(
        '#genericsubmenu input[type="text"][placeholder*="search" i]',
      );

      // Get initial count
      const initialSubtools = await getSubtools(page);
      const initialCount = await initialSubtools.count();

      // Filter stamps
      await searchInput.fill("house");
      await page.waitForTimeout(300);

      // Clear search
      await searchInput.fill("");
      await page.waitForTimeout(300);

      // Should show all stamps again
      const clearedSubtools = await getSubtools(page);
      const clearedCount = await clearedSubtools.count();
      expect(clearedCount).toBe(initialCount);

      assertNoConsoleErrors(consoleErrors, "clearing search");
    });

    test("no results shows helpful message", async ({ page }) => {
      const consoleErrors = setupConsoleErrorMonitoring(page);
      await selectTool(page, TOOL_ID);

      const searchInput = page.locator(
        '#genericsubmenu input[type="text"][placeholder*="search" i]',
      );

      // Search for something that definitely doesn't exist
      await searchInput.fill("zzzznonexistentstampzzz");
      await page.waitForTimeout(300);

      // Should show a "no results" message
      const noResultsMsg = page.locator('#genericsubmenu .no-results-message');
      await expect(noResultsMsg).toBeVisible();
      await expect(noResultsMsg).toContainText(/no.*stamp.*found/i);

      assertNoConsoleErrors(consoleErrors, "no results message");
    });

    test("search persists when switching stamp packs", async ({ page }) => {
      const consoleErrors = setupConsoleErrorMonitoring(page);
      await selectTool(page, TOOL_ID);

      const searchInput = page.locator(
        '#genericsubmenu input[type="text"][placeholder*="search" i]',
      );

      // Enter search query
      await searchInput.fill("house");
      await page.waitForTimeout(300);

      // Switch to next stamp pack
      const subtoolButtons = await getSubtools(page);
      const subtoolCount = await subtoolButtons.count();
      const nextPackBtn = subtoolButtons.nth(subtoolCount - 1);
      await nextPackBtn.click();

      // Search query should still be present
      await expect(searchInput).toHaveValue("house");

      assertNoConsoleErrors(consoleErrors, "search persistence");
    });

    test("keyboard interaction works correctly", async ({ page }) => {
      const consoleErrors = setupConsoleErrorMonitoring(page);
      await selectTool(page, TOOL_ID);

      const searchInput = page.locator(
        '#genericsubmenu input[type="text"][placeholder*="search" i]',
      );

      // Focus search input
      await searchInput.click();

      // Type using keyboard
      await page.keyboard.type("tree");
      await page.waitForTimeout(300);

      // Value should be updated
      await expect(searchInput).toHaveValue("tree");

      // Clear with keyboard
      await searchInput.selectText();
      await page.keyboard.press("Backspace");
      await page.waitForTimeout(300);

      // Should be cleared
      await expect(searchInput).toHaveValue("");

      assertNoConsoleErrors(consoleErrors, "keyboard interaction");
    });
  });
});
