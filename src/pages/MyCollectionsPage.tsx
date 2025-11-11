import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Filter, Plus, Music, MoreVertical, Trash2 } from "lucide-react";
import { EnhancedButton } from "../components/EnhancedButton";
import { CollectionCard } from "../components/CollectionCard";
import { Input } from "../components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { useMyCollections } from "../hooks/useMyCollections";
import { useDeleteCollection } from "../hooks/useDeleteCollection";

export function MyCollectionsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "name" | "items" | "likes">("recent");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [collectionToDelete, setCollectionToDelete] = useState<any | null>(null);

  // API data fetching
  const { data: collections, loading, error, refetch } = useMyCollections();
  const { deleteCollection, loading: deleting } = useDeleteCollection();

  // Filter and sort collections using useMemo for performance
  const sortedCollections = useMemo(() => {
    if (!collections) return [];

    // Filter collections
    const filtered = collections.filter(collection =>
      collection.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort collections
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.title.localeCompare(b.title);
        case "items":
          return b.itemCount - a.itemCount;
        case "likes":
          return b.likeCount - a.likeCount;
        case "recent":
        default:
          return new Date(b.likedDate).getTime() - new Date(a.likedDate).getTime();
      }
    });
  }, [collections, searchQuery, sortBy]);

  const handleCollectionClick = (collectionId: number) => {
    navigate(`/collections/${collectionId}`);
  };

  const handleDeleteClick = (collection: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setCollectionToDelete(collection);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!collectionToDelete) return;

    try {
      await deleteCollection(collectionToDelete.collectionId);
      setDeleteDialogOpen(false);
      setCollectionToDelete(null);
      refetch();
    } catch (error: any) {
      console.error("컬렉션 삭제 실패:", error);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="size-full bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-body-medium text-on-surface-variant">로딩 중...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="size-full bg-background flex flex-col">
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-outline-variant">
          <div className="flex items-center gap-4 p-3 md:p-4">
            <EnhancedButton
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="shrink-0"
            >
              <ArrowLeft className="size-6" />
            </EnhancedButton>
            <h1 className="text-title-large">내가 만든 컬렉션</h1>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center px-4">
            <Music className="size-12 mx-auto mb-4 text-destructive" />
            <h3 className="text-title-medium mb-2">데이터를 불러올 수 없습니다</h3>
            <p className="text-body-medium text-on-surface-variant mb-6">
              {error.message}
            </p>
            <EnhancedButton
              variant="filled"
              onClick={() => window.location.reload()}
            >
              다시 시도
            </EnhancedButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="size-full bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-outline-variant">
        <div className="flex items-center gap-4 p-3 md:p-4">
          <EnhancedButton
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="shrink-0"
          >
            <ArrowLeft className="size-6" />
          </EnhancedButton>
          <div className="flex-1">
            <h1 className="text-title-large">내가 만든 컬렉션</h1>
            <p className="text-body-medium text-on-surface-variant">
              {collections?.length || 0}개의 컬렉션
            </p>
          </div>
          <EnhancedButton
            variant="filled"
            size="icon"
            onClick={() => navigate('/collections/new')}
            className="shrink-0"
          >
            <Plus className="size-6" />
          </EnhancedButton>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="p-3 md:p-4 space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-on-surface-variant" />
            <Input
              placeholder="컬렉션 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <EnhancedButton variant="outlined" size="icon">
                <Filter className="size-4" />
              </EnhancedButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy("recent")}>
                최근 생성순
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("name")}>
                이름순
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("items")}>
                아이템 많은순
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("likes")}>
                좋아요 많은순
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Collections Grid */}
      <div className="p-3 md:p-4">
        {sortedCollections.length === 0 ? (
          <div className="text-center py-12">
            <Music className="size-12 mx-auto mb-4 text-on-surface-variant" />
            <h3 className="text-title-medium mb-2">컬렉션이 없습니다</h3>
            <p className="text-body-medium text-on-surface-variant mb-6">
              {searchQuery ? "검색 결과가 없습니다." : "첫 번째 컬렉션을 만들어보세요."}
            </p>
            {!searchQuery && (
              <EnhancedButton
                variant="filled"
                onClick={() => navigate('/collections/new')}
              >
                <Plus className="size-4 mr-2" />
                컬렉션 만들기
              </EnhancedButton>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
            {sortedCollections.map((collection) => (
              <div key={collection.collectionId} className="relative">
                <CollectionCard
                  collectionId={collection.collectionId}
                  title={collection.title}
                  description={collection.description}
                  author={collection.author}
                  itemCount={collection.itemCount}
                  likeCount={collection.likeCount}
                  coverImageUrl={collection.coverImageUrl}
                  tags={collection.tags}
                  onClick={() => handleCollectionClick(collection.collectionId)}
                  onAuthorClick={(authorId) => navigate(`/users/${authorId}`)}
                />
                {/* 더보기 메뉴 */}
                <div className="absolute top-2 right-2 z-50">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <EnhancedButton
                        variant="filled"
                        size="icon"
                        className="size-8 bg-surface-container/80 hover:bg-surface-container backdrop-blur-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="size-4" />
                      </EnhancedButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="text-error focus:text-error focus:bg-error/10"
                        onClick={(e) => handleDeleteClick(collection, e)}
                      >
                        <Trash2 className="size-4 mr-2" />
                        삭제
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom spacing for navigation */}
      <div className="h-20" />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>컬렉션을 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              {collectionToDelete && (
                <>
                  <span className="font-semibold">{collectionToDelete.title}</span> 컬렉션이 영구적으로 삭제됩니다.
                  <br />
                  이 작업은 되돌릴 수 없습니다.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setCollectionToDelete(null)} disabled={deleting}>
              취소
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={deleting}
              className="!bg-red-600 hover:!bg-red-700 !text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deleting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  삭제 중...
                </div>
              ) : (
                "삭제"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}