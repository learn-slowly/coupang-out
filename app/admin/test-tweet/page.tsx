import { CuratedTwitterSection } from "@/components/curated-twitter-section";

export default function TestTweetPage() {
    return (
        <div className="min-h-screen p-8 bg-zinc-950 text-white">
            <h1 className="text-2xl font-bold mb-8">트윗 큐레이션 테스트 페이지</h1>
            <p className="mb-8 text-zinc-400">
                이 페이지는 메인 페이지와 독립적으로 동작합니다.
                트윗이 정상적으로 로드되는지 확인해주세요.
            </p>
            <div className="max-w-4xl mx-auto border border-zinc-800 p-4 rounded-xl">
                <CuratedTwitterSection />
            </div>
        </div>
    );
}
