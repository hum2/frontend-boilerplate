import { test, expect } from '@playwright/test';

// NOTE: 必要に応じてbaseURLをplaywright.config.tsで設定してください

test.describe('トップページ E2Eテスト', () => {
    test.beforeEach(async ({ page }) => {
        // TODO APIのモック
        await page.route('**/api/todo*', async route => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify([
                    { id: 1, title: 'テストTODO', body: 'これはテスト用のTODOです' }
                ]),
            });
        });
        await page.goto('/');
    });

    test('Dialogの開閉ができる', async ({ page }) => {
        await expect(page.getByText('Dialog')).toBeVisible();
        await page.getByRole('button', { name: 'Click me' }).click();
        await expect(page.getByRole('dialog')).toBeVisible();
        await expect(page.getByText('Dialog Title')).toBeVisible();
        // Dialogを閉じる（onOpenChangeで閉じるUIがあれば追加）
        // ここではESCキーで閉じる例
        await page.keyboard.press('Escape');
        await expect(page.getByRole('dialog')).not.toBeVisible();
    });

    test('Alertが表示されている', async ({ page }) => {
        await expect(page.getByText('Click the button to see an alert.')).toBeVisible();
    });

    test('Formの入力と送信', async ({ page }) => {
        await expect(page.getByPlaceholder('Enter your name')).toBeVisible();
        await page.getByPlaceholder('Enter your name').fill('テストユーザー');
        // await page.getByRole('combobox').selectOption('option2');
        await page.getByLabel('I agree to the terms and conditions').check();
        await page.getByPlaceholder('Enter your message').fill('これはテストメッセージです');
        // 送信ボタン押下
        await page.getByRole('button', { name: 'Submit' }).click();
        // Alertのダイアログが出る場合は、ダイアログを受け入れる
        // ただし、window.alertはPlaywrightで自動的にacceptされる
    });

    test('TODOリストが表示されている', async ({ page }) => {
        await expect(page.getByText('TODO List')).toBeVisible();
        // TODOリストのアイテムが1つ以上表示されていることを確認
        const todoItems = await page.locator('ul > li').all();
        expect(todoItems.length).toBeGreaterThan(0);
        // タイトル・本文のテキストが表示されていること
        for (const item of todoItems) {
            await expect(item.locator('h2')).toBeVisible();
            await expect(item.locator('p')).toBeVisible();
        }
    });
});
