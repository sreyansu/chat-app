import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MediaGallery = ({ mediaFiles, onDownload, onDelete, currentUser, admins }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState(null);
  
  const isAdmin = admins?.some(admin => admin?.id === currentUser?.id);

  const filterOptions = [
    { key: 'all', label: 'All Media', icon: 'Grid3X3' },
    { key: 'images', label: 'Images', icon: 'Image' },
    { key: 'videos', label: 'Videos', icon: 'Video' },
    { key: 'documents', label: 'Documents', icon: 'FileText' }
  ];

  const filteredMedia = mediaFiles?.filter(file => {
    if (selectedFilter === 'all') return true;
    return file?.type === selectedFilter?.slice(0, -1); // Remove 's' from plural
  });

  const getFileIcon = (type) => {
    switch (type) {
      case 'image': return 'Image';
      case 'video': return 'Video';
      case 'document': return 'FileText';
      default: return 'File';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const handleMediaClick = (media) => {
    setSelectedMedia(media);
  };

  const closeModal = () => {
    setSelectedMedia(null);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Media Gallery ({filteredMedia?.length})
        </h3>
        <div className="flex items-center space-x-2">
          {filterOptions?.map((option) => (
            <Button
              key={option?.key}
              variant={selectedFilter === option?.key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(option?.key)}
              iconName={option?.icon}
              iconPosition="left"
            >
              {option?.label}
            </Button>
          ))}
        </div>
      </div>
      {filteredMedia?.length === 0 ? (
        <div className="text-center py-12">
          <Icon name="ImageOff" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">No media files</h4>
          <p className="text-muted-foreground">
            {selectedFilter === 'all' 
              ? "No media has been shared in this group yet."
              : `No ${selectedFilter} have been shared in this group yet.`
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMedia?.map((media) => (
            <div
              key={media?.id}
              className="relative group cursor-pointer"
              onClick={() => handleMediaClick(media)}
            >
              <div className="aspect-square bg-secondary rounded-lg overflow-hidden">
                {media?.type === 'image' ? (
                  <Image
                    src={media?.url}
                    alt={media?.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon 
                      name={getFileIcon(media?.type)} 
                      size={32} 
                      className="text-muted-foreground"
                    />
                  </div>
                )}
              </div>
              
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={(e) => {
                      e?.stopPropagation();
                      onDownload(media?.id);
                    }}
                    iconName="Download"
                  />
                  {(isAdmin || media?.uploadedBy === currentUser?.id) && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onDelete(media?.id);
                      }}
                      iconName="Trash2"
                    />
                  )}
                </div>
              </div>

              <div className="mt-2">
                <p className="text-xs font-medium text-foreground truncate">
                  {media?.name}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{formatFileSize(media?.size)}</span>
                  <span>{media?.uploadedAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Media Preview Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 z-300 bg-black/80 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full bg-card rounded-lg overflow-hidden">
            <div className="absolute top-4 right-4 z-10">
              <Button
                variant="secondary"
                size="icon"
                onClick={closeModal}
                iconName="X"
              />
            </div>
            
            <div className="p-6">
              {selectedMedia?.type === 'image' ? (
                <Image
                  src={selectedMedia?.url}
                  alt={selectedMedia?.name}
                  className="max-w-full max-h-96 object-contain mx-auto"
                />
              ) : selectedMedia?.type === 'video' ? (
                <video
                  src={selectedMedia?.url}
                  controls
                  className="max-w-full max-h-96 mx-auto"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="text-center py-12">
                  <Icon 
                    name={getFileIcon(selectedMedia?.type)} 
                    size={64} 
                    className="text-muted-foreground mx-auto mb-4"
                  />
                  <h4 className="text-lg font-medium text-foreground mb-2">
                    {selectedMedia?.name}
                  </h4>
                  <p className="text-muted-foreground mb-4">
                    {formatFileSize(selectedMedia?.size)}
                  </p>
                  <Button
                    variant="default"
                    onClick={() => onDownload(selectedMedia?.id)}
                    iconName="Download"
                    iconPosition="left"
                  >
                    Download File
                  </Button>
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {selectedMedia?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Uploaded by {selectedMedia?.uploadedByName} • {selectedMedia?.uploadedAt}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDownload(selectedMedia?.id)}
                      iconName="Download"
                      iconPosition="left"
                    >
                      Download
                    </Button>
                    {(isAdmin || selectedMedia?.uploadedBy === currentUser?.id) && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          onDelete(selectedMedia?.id);
                          closeModal();
                        }}
                        iconName="Trash2"
                        iconPosition="left"
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaGallery;