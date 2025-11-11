import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

export function PrivacyPolicyPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-lg font-semibold">개인정보 처리방침</h1>
        <div className="w-8" />
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        <div className="px-6 py-6 max-w-3xl mx-auto leading-relaxed space-y-8">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">FREQ 개인정보 처리방침</h2>
            <p className="text-muted-foreground">
              본 개인정보 처리방침은 FREQ 서비스가 이용자의 개인정보를 어떻게 수집, 이용, 보관, 제공 및 위탁하는지에 대해 설명합니다.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">1. 수집하는 개인정보</h2>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>회원가입 시: 이메일, 비밀번호, 닉네임</li>
              <li>서비스 이용 시 자동 수집: 이용 기록, 기기 정보, IP 주소 등</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">2. 개인정보의 이용 목적</h2>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>회원 관리 및 서비스 제공</li>
              <li>콘텐츠 추천 및 맞춤형 서비스 제공</li>
              <li>서비스 개선 및 운영 정책 수립</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">3. 개인정보의 보유 기간</h2>
            <p className="text-muted-foreground">
              회원 탈퇴 시까지 보유하며, 관련 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관 후 지체 없이 파기합니다.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">4. 개인정보의 제3자 제공</h2>
            <p className="text-muted-foreground">원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">5. 개인정보 처리 위탁</h2>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>인프라/호스팅: Cloudtype</li>
              <li>프론트엔드 배포: Vercel</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">6. 문의</h2>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>이메일: jason808@naver.com</li>
              <li>전화: 010-3777-8829</li>
            </ul>
          </section>

          <section className="space-y-1">
            <p className="text-sm text-muted-foreground">시행일: 2025년 11월 12일</p>
          </section>
        </div>
      </main>
    </div>
  );
}
