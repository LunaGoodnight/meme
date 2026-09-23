import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "隱私權政策",
  description: "梗圖喵喵隱私權政策",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        隱私權政策
      </h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        最後更新：2026 年 9 月
      </p>

      <div className="mt-8 space-y-8 leading-relaxed text-zinc-700 dark:text-zinc-300">
        <section>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">1. 概述</h2>
          <p className="mt-3">
            歡迎使用梗圖喵喵（以下簡稱「本站」，網址：
            <span className="font-mono text-sm">meme.vividcats.org</span>）。
            本隱私權政策說明本站如何收集、使用及保護您的個人資訊。使用本站即表示您同意本政策的內容。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">2. 資訊收集</h2>
          <p className="mt-3">本站不會主動要求您提供個人資料。但在您瀏覽本站時，以下資訊可能會被自動收集：</p>
          <ul className="mt-3 list-inside list-disc space-y-2">
            <li>瀏覽器類型與版本</li>
            <li>作業系統</li>
            <li>造訪頁面與停留時間</li>
            <li>來源網址（Referrer）</li>
            <li>IP 位址（以匿名化方式處理）</li>
          </ul>
          <p className="mt-3">
            上述資訊由第三方服務自動收集，用於分析網站流量與改善使用者體驗，不會用於識別個人身份。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">3. 使用者上傳的圖片</h2>
          <p className="mt-3">
            本站提供梗圖上傳功能。您上傳的圖片與所填寫的標題、關鍵字將公開顯示於本站，
            並儲存於本站使用的雲端儲存服務。請勿上傳包含個人隱私、他人肖像或受著作權保護的內容。
          </p>
          <p className="mt-3">
            若您發現本站上有侵犯您權益的圖片，請透過下方聯絡方式告知，本站將儘速處理下架。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">4. Cookie 使用</h2>
          <p className="mt-3">本站可能使用 Cookie 以提供更好的瀏覽體驗，包含：</p>
          <ul className="mt-3 list-inside list-disc space-y-2">
            <li>
              <strong>功能性 Cookie</strong>：記錄您的瀏覽偏好設定
            </li>
            <li>
              <strong>廣告 Cookie</strong>：由 Google AdSense 設置，用於顯示個人化廣告
            </li>
          </ul>
          <p className="mt-3">
            您可以在瀏覽器設定中停用 Cookie，但這可能影響部分功能的正常運作。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">5. Google AdSense</h2>
          <p className="mt-3">
            本站使用 Google AdSense 顯示廣告。Google AdSense 可能會使用 Cookie
            根據您過去造訪本站或其他網站的情況來投放廣告。
          </p>
          <p className="mt-3">
            您可以前往{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Google 廣告設定
            </a>
            {" "}選擇退出個人化廣告，或造訪{" "}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              aboutads.info
            </a>
            {" "}了解更多關於第三方廣告 Cookie 的選擇。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">6. 第三方連結</h2>
          <p className="mt-3">
            本站可能包含連結至外部網站。這些外部網站有各自的隱私權政策，
            本站對其內容與隱私實踐不負任何責任，建議您在造訪時自行查閱相關政策。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">7. 兒童隱私</h2>
          <p className="mt-3">
            本站並非針對 13 歲以下兒童設計，且不會刻意收集兒童的個人資訊。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">8. 政策變更</h2>
          <p className="mt-3">
            本站保留隨時修改本隱私權政策的權利。修改後的政策將於本頁面公告，
            並以頁面頂端的「最後更新」日期為準。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">9. 聯絡我們</h2>
          <p className="mt-3">如對本隱私權政策有任何疑問，歡迎透過以下方式聯絡：</p>
          <p className="mt-2">
            <a
              href="mailto:catsheue@gmail.com"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              catsheue@gmail.com
            </a>
          </p>
        </section>
      </div>

      <p className="mt-12">
        <Link href="/" className="text-blue-600 hover:underline dark:text-blue-400">
          ← 回首頁
        </Link>
      </p>
    </article>
  );
}
