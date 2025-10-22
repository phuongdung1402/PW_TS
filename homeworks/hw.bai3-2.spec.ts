import { test, expect } from "@playwright/test";

//ok
test("Homework Bai 1", async ({ page }) => {
  await page.goto("https://demoapp-sable-gamma.vercel.app/");
  await page.getByRole("link", { name: "Bài 2: Playwright Locators" }).click();
  await page.getByRole("button", { name: "CSS Selector" }).click();
  await page.getByRole("button", { name: "Bài tập" }).click();

  //1.Câu 1a: Tìm tất cả sản phẩm có discount badge
  page.locator(".product-grid .discount-badge");

  //2.Câu 1b: Tìm nút "Add to Cart" của sản phẩm featured (có border vàng)
  page.locator(".add-cart[disabled]");

  //3.Câu 1c: Tìm tất cả sản phẩm out of stock
  page.locator(".out-of-stock");

  //4.Câu 2a: Tìm tất cả rows có status "inactive"
  page.locator('.user-row[data-status="inactive"]');

  //5.Câu 2b: Tìm nút "Delete" của user có ID "002"
  page.locator('.btn-delete[data-user="002"]');

  //6.Câu 2c: Tìm row cuối cùng trong table body
  page.locator("tbody .user-row:last-child");

  //7.Câu 3a: Tìm tất cả input fields có lỗi validation (class "invalid")
  page.locator(".invalid");

  //8.Câu 3b: Tìm error message của field "email"
  page.locator('.form-group[data-field="email"] .error-message');

  //9.Câu 3c: Tìm tất cả required labels trong section "personal-info"
  page.locator(".personal-info [required]");

  //9.Câu 3d: Tìm submit button bị disabled
  page.locator('.form-actions [type="submit"][disabled]');

  //10.Câu 4a: Tìm modal overlay đang active
  page.locator(".modal-overlay.active");

  //11.Câu 4b: Tìm tất cả checkbox đã được checked trong modal
  page.locator('.modal-overlay.active [type="checkbox"][checked]');

  //12.Câu 4c: Tìm close button trong modal header
  page.locator(".modal-header .btn-close");

  //13.Câu 5a: Tìm tất cả sản phẩm có title chứa từ "Gaming Laptop"
  page.locator('.search-results [data-title*="Gaming Laptop"]');

  //14.Câu 5b: Tìm sản phẩm có availability "low-stock"
  page.locator('.search-results [data-availability="low-stock"]');

  //15.Câu 5c: Tìm nút "Add to Cart" của sản phẩm có giá dưới $100
  //khum biet lam :(((
  // đây nhé
  // .result-item[data-price="49.99"] .btn-add-cart
});
