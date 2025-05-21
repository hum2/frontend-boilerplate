import { unstable_noStore } from "next/cache";
import { CounterPageClient } from "./page.client";
import Link from "next/link";
import { Button } from "@/components/atoms/Button/Button";

//「いまのアクセスが何番目か」を取得できるオブジェクト（注意: めっちゃ手抜きです！！）
const visitCounter = {
    count: 0,
    current() {
        return ++this.count;
    },
};

export default function CounterPageServer() {
    unstable_noStore(); // 動的ページにするのに必要（next 15.1.0 デフォルト設定）
    const visitCount = visitCounter.current();
    return (
        <>
            <div>
                <CounterPageClient visitCount={visitCount} />
            </div>
            <Link href="/">
                <Button label="Homeへ" />
            </Link>
        </>
    );
}
