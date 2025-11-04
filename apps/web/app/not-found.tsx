import Link from 'next/link';
import { Button } from '@repo/ui';

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
            <Link href="/">
                <Button variant="primary">홈으로 돌아가기</Button>
            </Link>
        </div>
    );
}
