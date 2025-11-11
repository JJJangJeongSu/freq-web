import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, User, Check, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useLogin, useSignup, useCheckEmail, useCheckNickname } from "../hooks/useAuth";

export function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("login");
  const [nicknameCheckResult, setNicknameCheckResult] = useState<"available" | "taken" | null>(null);
  const [emailCheckResult, setEmailCheckResult] = useState<"available" | "taken" | null>(null);
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [nicknameValidationMessage, setNicknameValidationMessage] = useState("");
  const [emailValidationMessage, setEmailValidationMessage] = useState("");

  // API Hooks
  const loginMutation = useLogin();
  const signupMutation = useSignup();
  const checkEmailMutation = useCheckEmail();
  const checkNicknameMutation = useCheckNickname();

  const isLoading = loginMutation.isPending || signupMutation.isPending;
  const isCheckingEmail = checkEmailMutation.isPending;
  const isCheckingNickname = checkNicknameMutation.isPending;

  // 이메일 형식 검증 함수
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 닉네임 검증 함수
  const validateNickname = (nickname: string): boolean => {
    return nickname.trim().length >= 2;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 유효성 검사
    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    if (!email.includes("@")) {
      setError("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    if (password.length < 6) {
      setError("비밀번호는 6자 이상이어야 합니다.");
      return;
    }

    // 실제 로그인 API 호출
    try {
      await loginMutation.mutateAsync({ email, password });
      // 성공 시 홈으로 이동
      navigate('/home');
    } catch (err: any) {
      // 에러 처리
      const errorMessage = err.response?.data?.error?.message || "로그인에 실패했습니다.";
      setError(errorMessage);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 회원가입 유효성 검사
    if (!nickname || !email || !password || !confirmPassword) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    // 닉네임 중복 검사 확인
    if (nicknameCheckResult !== "available") {
      setError("닉네임 중복 검사를 완료해주세요.");
      return;
    }

    // 이메일 중복 검사 확인
    if (emailCheckResult !== "available") {
      setError("이메일 중복 검사를 완료해주세요.");
      return;
    }

    if (!email.includes("@")) {
      setError("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    if (password.length < 6) {
      setError("비밀번호는 6자 이상이어야 합니다.");
      return;
    }

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 실제 회원가입 API 호출
    try {
      await signupMutation.mutateAsync({
        email,
        password,
        nickname,
      });
      // 회원가입 성공 후 자동 로그인
      await loginMutation.mutateAsync({ email, password });
      navigate('/home');
    } catch (err: any) {
      const errorMessage = err.response?.data?.error?.message || "회원가입에 실패했습니다.";
      setError(errorMessage);
    }
  };

  const handleCheckNickname = async () => {
    setError("");

    // 실제 닉네임 중복 검사 API 호출
    try {
      const result = await checkNicknameMutation.mutateAsync(nickname);
      // API 응답: { success: boolean, data: { available?: boolean } }
      const isAvailable = (result as any)?.available;

      if (isAvailable) {
        setNicknameCheckResult("available");
      } else {
        setNicknameCheckResult("taken");
        setError("이미 사용 중인 닉네임입니다.");
      }
    } catch (err: any) {
      setNicknameCheckResult("taken");
      const errorMessage = err.response?.data?.error?.message || "닉네임 확인 중 오류가 발생했습니다.";
      setError(errorMessage);
    }
  };

  const handleCheckEmail = async () => {
    setError("");

    // 실제 이메일 중복 검사 API 호출
    try {
      const result = await checkEmailMutation.mutateAsync(email);
      // API 응답: { success: boolean, data: { available?: boolean } }
      const isAvailable = (result as any)?.available;

      if (isAvailable) {
        setEmailCheckResult("available");
      } else {
        setEmailCheckResult("taken");
        setError("이미 사용 중인 이메일입니다.");
      }
    } catch (err: any) {
      setEmailCheckResult("taken");
      const errorMessage = err.response?.data?.error?.message || "이메일 확인 중 오류가 발생했습니다.";
      setError(errorMessage);
    }
  };

  const handleNicknameChange = (value: string) => {
    setNickname(value);
    // 닉네임이 변경되면 중복 검사 결과 초기화
    setNicknameCheckResult(null);

    // 실시간 유효성 검사
    if (value.length === 0) {
      setIsNicknameValid(false);
      setNicknameValidationMessage("");
    } else if (value.trim().length < 2) {
      setIsNicknameValid(false);
      setNicknameValidationMessage("닉네임은 2자 이상이어야 합니다.");
    } else {
      setIsNicknameValid(true);
      setNicknameValidationMessage("");
    }

    if (error === "이미 사용 중인 닉네임입니다." || error === "닉네임 중복 검사를 완료해주세요.") {
      setError("");
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    // 이메일이 변경되면 중복 검사 결과 초기화
    setEmailCheckResult(null);

    // 실시간 유효성 검사
    if (value.length === 0) {
      setIsEmailValid(false);
      setEmailValidationMessage("");
    } else if (!validateEmail(value)) {
      setIsEmailValid(false);
      setEmailValidationMessage("올바른 이메일 형식을 입력해주세요.");
    } else {
      setIsEmailValid(true);
      setEmailValidationMessage("");
    }

    if (error === "이미 사용 중인 이메일입니다." || error === "이메일 중복 검사를 완료해주세요.") {
      setError("");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-6">
          {/* Logo Section */}
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <img
                src="/logo.png"
                alt="FREQ"
                className="h-48 w-48 md:h-48 md:w-48 select-none"
                draggable={false}
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  if (!el.src.includes('/favicon.svg')) {
                    el.src = '/favicon.svg';
                  }
                }}
              />
            </div>
            <h1 className="text-7xl md:text-7xl" style={{ fontFamily: "'Poppins','Roboto',-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif", fontWeight: 700, fontStyle: 'italic', letterSpacing: '-0.02em', color: 'var(--on-surface)' }}>freq</h1>
            <p className="text-m md:text-base">당신의 음악 취향을 기록하세요</p>
          </div>

          {/* Auth Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">로그인</TabsTrigger>
              <TabsTrigger value="signup">회원가입</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="login-email">이메일</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="이메일을 입력하세요"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="login-password">비밀번호</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="비밀번호를 입력하세요"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Login Button */}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "로그인 중..." : "로그인"}
                </Button>
              </form>
            </TabsContent>

            {/* Sign Up Tab */}
            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSignUp} className="space-y-4">
                {/* Nickname Field */}
                <div className="space-y-2">
                  <Label htmlFor="signup-nickname">닉네임</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-nickname"
                        type="text"
                        placeholder="닉네임을 입력하세요"
                        value={nickname}
                        onChange={(e) => handleNicknameChange(e.target.value)}
                        className={`pl-10 ${
                          nicknameCheckResult === "available"
                            ? "border-green-500"
                            : nicknameCheckResult === "taken"
                            ? "border-red-500"
                            : ""
                        }`}
                        disabled={isLoading}
                      />
                      {nicknameCheckResult === "available" && (
                        <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                      )}
                      {nicknameCheckResult === "taken" && (
                        <X className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCheckNickname}
                      disabled={isLoading || isCheckingNickname || !isNicknameValid}
                      className="whitespace-nowrap"
                    >
                      {isCheckingNickname ? "확인 중..." : "중복 검사"}
                    </Button>
                  </div>
                  {nicknameValidationMessage && (
                    <p className="text-sm text-red-600">{nicknameValidationMessage}</p>
                  )}
                  {nicknameCheckResult === "available" && (
                    <p className="text-sm text-green-600">사용 가능한 닉네임입니다.</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="signup-email">이메일</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="이메일을 입력하세요"
                        value={email}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        className={`pl-10 ${
                          emailCheckResult === "available"
                            ? "border-green-500"
                            : emailCheckResult === "taken"
                            ? "border-red-500"
                            : ""
                        }`}
                        disabled={isLoading}
                      />
                      {emailCheckResult === "available" && (
                        <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                      )}
                      {emailCheckResult === "taken" && (
                        <X className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCheckEmail}
                      disabled={isLoading || isCheckingEmail || !isEmailValid}
                      className="whitespace-nowrap"
                    >
                      {isCheckingEmail ? "확인 중..." : "중복 검사"}
                    </Button>
                  </div>
                  {emailValidationMessage && (
                    <p className="text-sm text-red-600">{emailValidationMessage}</p>
                  )}
                  {emailCheckResult === "available" && (
                    <p className="text-sm text-green-600">사용 가능한 이메일입니다.</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="signup-password">비밀번호</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="비밀번호를 입력하세요 (6자 이상)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">비밀번호 확인</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="비밀번호를 다시 입력하세요"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 pr-10"
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Sign Up Button */}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "회원가입 중..." : "회원가입"}
                </Button>
              </form>
            </TabsContent>

            {/* Error Message */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
