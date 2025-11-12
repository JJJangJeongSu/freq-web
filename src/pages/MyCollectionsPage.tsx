import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Filter, Plus, Music, MoreVertical, Trash2, Loader2, Pencil } from "lucide-react";
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
import { InfiniteScrollTrigger } from "../components/InfiniteScrollTrigger";
import { useMyCollectionsPaginated } from "../hooks/useMyCollectionsPaginated";
import { useDeleteCollection } from "../hooks/useDeleteCollection";

export function MyCollectionsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [collectionToDelete, setCollectionToDelete] = useState<any | null>(null);

  // Paginated hook (infinite scroll)
  const {
    collections,
    pagination,
    loading,
    error,
    sortBy,
    setSortBy,
    loadMore,
    refresh,
    hasMore
  } = useMyCollectionsPaginated('infinite');

  const { deleteCollection, loading: deleting } = useDeleteCollection();

  // Client-side search filtering (필터링만, 정렬은 서버에서)
  const filteredCollections = useMemo(() => {
    if (!searchQuery.trim()) return collections;

    return collections.filter(collection =>
      collection.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [collections, searchQuery]);

  const handleCollectionClick = (collectionId: number) => {
    navigate(`/collections/${collectionId}`);
  };

  const handleEditClick = (collectionId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/collections/edit/${collectionId}`);
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
      refresh();
    } catch (error: any) {
      console.error("컬렉션 삭제 실패:", error);
    }
  };

  // 초기 로딩 상태 (데이터가 없을 때만)
  if (loading && collections.length === 0) {
    return (
      <div className="size-full bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="size-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-body-medium text-on-surface-variant">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태 (데이터가 없을 때만)
  if (error && collections.length === 0) {
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
              {error?.message || '컬렉션을 불러오는 중 오류가 발생했습니다.'}
            </p>
            <EnhancedButton
              variant="filled"
              onClick={() => refresh()}
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
              {pagination
                ? `총 ${pagination.totalItems}개의 컬렉션 (${collections.length}개 표시)`
                : `${collections.length}개의 컬렉션`
              }
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
                최신순
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("popularity")}>
                인기순
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("old")}>
                오래된순
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Collections Grid */}
      <div className="p-3 md:p-4">
        {filteredCollections.length === 0 ? (
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
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
              {filteredCollections.map((collection) => (
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
                        onClick={(e) => handleEditClick(collection.collectionId, e)}
                      >
                        <Pencil className="size-4 mr-2" />
                        수정하기
                      </DropdownMenuItem>
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

            {/* Infinite Scroll Trigger (검색 모드가 아닐 때만) */}
            {!searchQuery && (
              <InfiniteScrollTrigger
                onLoadMore={loadMore}
                loading={loading}
                hasMore={hasMore}
                threshold={200}
              />
            )}
          </>
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