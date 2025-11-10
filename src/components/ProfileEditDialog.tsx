import { useState, useRef, useEffect } from "react";
import { Camera, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useUpdateBio } from "../hooks/useUpdateBio";
import { useUpdateProfileImage } from "../hooks/useUpdateProfileImage";

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

  const [editedBio, setEditedBio] = useState(bio);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // bio prop이 변경되면 editedBio 업데이트
  useEffect(() => {
    setEditedBio(bio);
  }, [bio]);

  // 모달이 닫힐 때 상태 초기화
  useEffect(() => {
    if (!open) {
      setSelectedFile(null);
      setPreviewUrl(null);
      setSubmitSuccess(false);
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

  const handleSubmit = async () => {
    try {
      setSubmitSuccess(false);

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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>프로필 편집</DialogTitle>
          <DialogDescription>이미지와 소개를 변경할 수 있습니다.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {/* 프로필 이미지 업로드 */}
          <div className="space-y-2">
            <Label>프로필 이미지</Label>
            <div className="flex justify-center py-4">
              <div className="relative">
                <Avatar className="w-32 h-32 border-2 border-border">
                  <AvatarImage src={previewUrl || profileImageUrl || undefined} />
                  <AvatarFallback className="text-4xl">
                    {username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 w-9 h-9 rounded-full"
                  variant="secondary"
                  onClick={handleImageClick}
                  disabled={bioLoading || imageLoading}
                >
                  <Camera className="w-5 h-5" />
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">소개</Label>
            <Textarea
              id="bio"
              value={editedBio}
              onChange={(e) => setEditedBio(e.target.value)}
              className="col-span-3"
              disabled={bioLoading || imageLoading}
            />
          </div>

          {/* 에러 메시지 */}
          {(bioError || imageError) && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive">
                {bioError?.message || imageError?.message}
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
            disabled={bioLoading || imageLoading}
          >
            취소
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={bioLoading || imageLoading || submitSuccess}
          >
            {bioLoading || imageLoading ? (
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
