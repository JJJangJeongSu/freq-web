import { useState, useRef, useEffect, useCallback } from "react";
import { Camera, Loader2, Check, X, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useUpdateBio } from "../hooks/useUpdateBio";
import { useUpdateProfileImage } from "../hooks/useUpdateProfileImage";
import { useUpdateNickname } from "../hooks/useUpdateNickname";
import { useCheckNickname } from "../hooks/useCheckNickname";

interface ProfileEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profileImageUrl: string | null;
  username: string;
  bio: string;
  onSuccess?: () => void;
}

export function ProfileEditDialog({
  open,
  onOpenChange,
  profileImageUrl,
  username,
  bio,
  onSuccess
}: ProfileEditDialogProps) {
  const { updateBio, loading: bioLoading, error: bioError } = useUpdateBio();
  const { updateProfileImage, loading: imageLoading, error: imageError } = useUpdateProfileImage();
  const { updateNickname, loading: nicknameLoading, error: nicknameError: nicknameUpdateError } = useUpdateNickname();
  const { checkNickname, checking: nicknameChecking } = useCheckNickname();

  const [editedNickname, setEditedNickname] = useState(username);
  const [editedBio, setEditedBio] = useState(bio);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // 닉네임 validation 상태
  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [nicknameAvailable, setNicknameAvailable] = useState<boolean | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const nicknameCheckTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // props 변경되면 상태 업데이트
  useEffect(() => {
    setEditedNickname(username);
    setEditedBio(bio);
  }, [username, bio]);

  // 모달이 닫힐 때 상태 초기화
  useEffect(() => {
    if (!open) {
      setSelectedFile(null);
      setPreviewUrl(null);
      setSubmitSuccess(false);
      setNicknameError(null);
      setNicknameChecking(false);
      setNicknameAvailable(null);
    }
  }, [open]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 파일 유효성 검사
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드할 수 있습니다.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('이미지 파일은 5MB 이하여야 합니다.');
        return;
      }

      setSelectedFile(file);

      // 미리보기 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 닉네임 validation
  const validateNickname = (nickname: string) => {
    if (nickname.length < 2) {
      setNicknameError('닉네임은 2자 이상이어야 합니다.');
      setNicknameAvailable(false);
      return false;
    }
    if (nickname.length > 20) {
      setNicknameError('닉네임은 20자 이하여야 합니다.');
      setNicknameAvailable(false);
      return false;
    }
    if (!/^[가-힣a-zA-Z0-9_]+$/.test(nickname)) {
      setNicknameError('닉네임은 한글, 영문, 숫자, 언더스코어만 사용 가능합니다.');
      setNicknameAvailable(false);
      return false;
    }
    setNicknameError(null);
    return true;
  };

  // 닉네임 중복 체크 (debounced)
  const performNicknameCheck = useCallback(async (nickname: string) => {
    try {
      const isAvailable = await checkNickname(nickname);
      setNicknameAvailable(isAvailable);

      if (!isAvailable) {
        setNicknameError('이미 사용 중인 닉네임입니다.');
      }
    } catch (error) {
      console.error('Nickname check failed:', error);
    }
  }, [checkNickname]);

  // 닉네임 변경 핸들러
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    setEditedNickname(newNickname);

    // 이전 타이머 취소
    if (nicknameCheckTimeoutRef.current) {
      clearTimeout(nicknameCheckTimeoutRef.current);
    }

    // 기존 닉네임과 같으면 validation 스킵
    if (newNickname === username) {
      setNicknameError(null);
      setNicknameAvailable(null);
      return;
    }

    // 실시간 validation
    if (validateNickname(newNickname)) {
      // 500ms debounce 후 중복 체크
      nicknameCheckTimeoutRef.current = setTimeout(() => {
        performNicknameCheck(newNickname);
      }, 500);
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitSuccess(false);

      // 닉네임 validation 및 업데이트
      if (editedNickname !== username) {
        if (!validateNickname(editedNickname)) {
          return;
        }
        if (!nicknameAvailable) {
          setNicknameError('사용할 수 없는 닉네임입니다.');
          return;
        }

        // 닉네임 업데이트 API 호출
        await updateNickname(editedNickname);
      }

      // 이미지 업데이트
      if (selectedFile) {
        await updateProfileImage(selectedFile);
      }

      // 소개글 업데이트
      if (editedBio !== bio) {
        await updateBio(editedBio);
      }

      // 성공 처리
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        onOpenChange(false);
        setSelectedFile(null);
        setPreviewUrl(null);
        onSuccess?.();
      }, 2000);
    } catch (err) {
      console.error('Profile update failed:', err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>프로필 편집</DialogTitle>
          <DialogDescription>프로필 이미지, 닉네임, 소개를 변경할 수 있습니다.</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {/* 프로필 이미지 업로드 */}
          <div className="space-y-2">
            <Label>프로필 이미지</Label>
            <div className="flex justify-center py-4">
              <div className="relative">
                <Avatar className="w-24 h-24 border-2 border-border">
                  <AvatarImage src={previewUrl || profileImageUrl || undefined} />
                  <AvatarFallback className="text-3xl">
                    {username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full shadow-lg"
                  variant="secondary"
                  onClick={handleImageClick}
                  disabled={bioLoading || imageLoading}
                >
                  <Camera className="w-4 h-4" />
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  style={{ display: 'none' }}
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              JPG, PNG 파일 (최대 5MB)
            </p>
          </div>

          {/* 닉네임 입력 */}
          <div className="space-y-2">
            <Label htmlFor="nickname">닉네임</Label>
            <div className="relative">
              <Input
                id="nickname"
                value={editedNickname}
                onChange={handleNicknameChange}
                placeholder="닉네임을 입력하세요"
                disabled={bioLoading || imageLoading}
                className={
                  nicknameError
                    ? 'pr-10 border-destructive focus-visible:ring-destructive'
                    : editedNickname !== username && nicknameAvailable
                    ? 'pr-10 border-green-500 focus-visible:ring-green-500'
                    : 'pr-10'
                }
              />
              {/* Validation 아이콘 */}
              {editedNickname !== username && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {nicknameChecking ? (
                    <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                  ) : nicknameError ? (
                    <X className="w-4 h-4 text-destructive" />
                  ) : nicknameAvailable ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : null}
                </div>
              )}
            </div>
            {/* 닉네임 가이드/에러 메시지 */}
            {nicknameError ? (
              <div className="flex items-center gap-1.5 text-xs text-destructive">
                <AlertCircle className="w-3 h-3" />
                <span>{nicknameError}</span>
              </div>
            ) : editedNickname !== username && nicknameAvailable ? (
              <div className="flex items-center gap-1.5 text-xs text-green-600">
                <Check className="w-3 h-3" />
                <span>사용 가능한 닉네임입니다.</span>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">
                2-20자의 한글, 영문, 숫자, 언더스코어(_)만 사용 가능합니다.
              </p>
            )}
          </div>

          {/* 소개 입력 */}
          <div className="space-y-2">
            <Label htmlFor="bio">소개</Label>
            <Textarea
              id="bio"
              value={editedBio}
              onChange={(e) => setEditedBio(e.target.value)}
              placeholder="자신을 소개해주세요"
              rows={4}
              disabled={bioLoading || imageLoading}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground text-right">
              {editedBio.length} / 500
            </p>
          </div>

          {/* 에러 메시지 */}
          {(bioError || imageError || nicknameUpdateError) && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive">
                {bioError?.message || imageError?.message || nicknameUpdateError?.message}
              </p>
            </div>
          )}

          {/* 성공 메시지 */}
          {submitSuccess && (
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-sm text-green-600">✓ 프로필이 업데이트되었습니다!</p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={() => {
              onOpenChange(false);
              setSelectedFile(null);
              setPreviewUrl(null);
            }}
            disabled={bioLoading || imageLoading || nicknameLoading}
            variant="outline"
          >
            취소
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={
              bioLoading ||
              imageLoading ||
              nicknameLoading ||
              nicknameChecking ||
              submitSuccess ||
              (editedNickname !== username && !nicknameAvailable)
            }
          >
            {bioLoading || imageLoading || nicknameLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                저장 중...
              </>
            ) : (
              '저장'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
