import React, { useEffect, useRef, useState } from 'react';
import { Eye, FileText, Trash2, UploadCloud, X } from 'lucide-react';

const DOCUMENT_STORAGE_KEY = 'novaDentalUploadedDocuments';

const formatBytes = (bytes) => {
  if (!bytes) return '0 KB';
  const units = ['B', 'KB', 'MB', 'GB'];
  const sizeIndex = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / (1024 ** sizeIndex)).toFixed(sizeIndex === 0 ? 0 : 1)} ${units[sizeIndex]}`;
};

const getFileType = (file) => {
  const extension = file.name.split('.').pop()?.toUpperCase();
  if (extension && extension !== file.name.toUpperCase()) return extension;
  return file.type || 'File';
};

const readUploadedDocuments = () => {
  try {
    return JSON.parse(localStorage.getItem(DOCUMENT_STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

const readFileAsDataUrl = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = () => reject(reader.error);
  reader.readAsDataURL(file);
});

const canPreviewAsImage = (document) => document.mimeType?.startsWith('image/');
const canPreviewInFrame = (document) => (
  document.mimeType === 'application/pdf' ||
  document.mimeType?.startsWith('text/') ||
  ['PDF', 'TXT'].includes(document.type)
);

const SecureUploads = () => {
  const fileInputRef = useRef(null);
  const [uploadedDocuments, setUploadedDocuments] = useState(readUploadedDocuments);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [documentMeta, setDocumentMeta] = useState({
    patient: '',
    category: 'Clinical file',
    note: ''
  });

  useEffect(() => {
    localStorage.setItem(DOCUMENT_STORAGE_KEY, JSON.stringify(uploadedDocuments));
  }, [uploadedDocuments]);

  const addFiles = async (fileList) => {
    const files = Array.from(fileList || []);
    if (files.length === 0) return;

    const nextDocuments = await Promise.all(
      files.map(async (file) => ({
        id: `${file.name}-${file.lastModified}-${file.size}-${Date.now()}`,
        name: file.name,
        patient: documentMeta.patient.trim() || 'Unassigned patient',
        category: documentMeta.category,
        note: documentMeta.note.trim(),
        type: getFileType(file),
        mimeType: file.type || 'application/octet-stream',
        size: formatBytes(file.size),
        uploadedAt: new Date().toLocaleString(),
        dataUrl: await readFileAsDataUrl(file)
      }))
    );

    setUploadedDocuments((current) => [...nextDocuments, ...current]);
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    addFiles(event.target.files);
    event.target.value = '';
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    addFiles(event.dataTransfer.files);
  };

  const deleteDocument = (documentId) => {
    setUploadedDocuments((current) => current.filter((document) => document.id !== documentId));
    setSelectedDocument((current) => (current?.id === documentId ? null : current));
  };

  const viewDocument = (document) => {
    if (!document.dataUrl) {
      window.alert('This older upload was saved before file previews were available. Please upload it again to view it here.');
      return;
    }

    setSelectedDocument(document);
    setIsPreviewExpanded(false);
  };

  return (
    <div className={`page-container${selectedDocument ? '' : ' animate-fade-in'}`}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Documents</h1>
          <p className="page-subtitle">Upload clinic documents, add basic details, and delete files when needed.</p>
        </div>
        <button className="btn btn-primary" onClick={openFilePicker}>
          <UploadCloud size={18} />
          Upload Document
        </button>
      </div>

      <input
        ref={fileInputRef}
        className="visually-hidden"
        type="file"
        multiple
        onChange={handleFileChange}
        accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.dicom,.dcm,.txt"
      />

      <div className="upload-page-stack">
        <div className="upload-management-grid">
          <section className="card upload-details-card">
            <div className="section-heading">
              <div>
                <h2>Document Details</h2>
                <p>Add this information before choosing files.</p>
              </div>
            </div>
            <div className="upload-detail-fields">
              <label className="input-group">
                <span className="input-label">Patient name</span>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Example: Aarav Mehta"
                  value={documentMeta.patient}
                  onChange={(event) => setDocumentMeta((current) => ({ ...current, patient: event.target.value }))}
                />
              </label>
              <label className="input-group">
                <span className="input-label">Document type</span>
                <select
                  className="input-field"
                  value={documentMeta.category}
                  onChange={(event) => setDocumentMeta((current) => ({ ...current, category: event.target.value }))}
                >
                  <option>Clinical file</option>
                  <option>X-ray</option>
                  <option>Lab report</option>
                  <option>Consent form</option>
                  <option>Prescription</option>
                </select>
              </label>
              <label className="input-group">
                <span className="input-label">Note</span>
                <textarea
                  className="input-field text-area"
                  placeholder="Optional short note"
                  value={documentMeta.note}
                  onChange={(event) => setDocumentMeta((current) => ({ ...current, note: event.target.value }))}
                />
              </label>
            </div>
          </section>

          <section
            className={`card secure-drop-card upload-only-card${isDragging ? ' drag-active' : ''}`}
            onClick={openFilePicker}
            onDragEnter={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragOver={(event) => event.preventDefault()}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openFilePicker();
              }
            }}
          >
            <div className="secure-drop-icon">
              <UploadCloud size={34} />
            </div>
            <h2>Upload documents</h2>
            <p>Click here or drag files into this box.</p>
            <span className="upload-file-hint">PDF, images, Word docs, DICOM, or text files</span>
          </section>
        </div>

        <section className="card uploaded-documents-card">
          <div className="section-heading">
            <div>
              <h2>Uploaded Documents</h2>
              <p>{uploadedDocuments.length} file{uploadedDocuments.length === 1 ? '' : 's'} uploaded.</p>
            </div>
          </div>

          {uploadedDocuments.length > 0 ? (
            <div className="document-vault-list">
              {uploadedDocuments.map((document) => (
                <article key={document.id}>
                  <span className="stat-icon bg-primary-light text-primary"><FileText size={20} /></span>
                  <div>
                    <strong>{document.name}</strong>
                    <p>{document.patient} · {document.category} · {document.type} · {document.size}</p>
                    {document.note && <p>{document.note}</p>}
                    <small>Uploaded {document.uploadedAt}</small>
                  </div>
                  <div className="document-actions">
                    <button
                      className="btn btn-secondary compact-btn"
                      type="button"
                      onClick={() => viewDocument(document)}
                    >
                      <Eye size={14} />
                      View
                    </button>
                    <button
                      className="btn btn-danger compact-btn"
                      type="button"
                      onClick={() => deleteDocument(document.id)}
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <FileText size={28} />
              <p>No documents uploaded yet.</p>
            </div>
          )}
        </section>

      </div>

      {selectedDocument && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="document-preview-title">
          <section className={`modal-card document-preview-modal${isPreviewExpanded ? ' expanded' : ''}`}>
            <div className="modal-header">
              <div>
                <h2 id="document-preview-title">Document Preview</h2>
                <p>{selectedDocument.name}</p>
              </div>
              <div className="document-preview-actions">
                <button
                  className="btn btn-secondary compact-btn"
                  type="button"
                  onClick={() => setIsPreviewExpanded((current) => !current)}
                >
                  {isPreviewExpanded ? 'Fit view' : 'Open full size'}
                </button>
                <button className="icon-btn" type="button" onClick={() => {
                  setSelectedDocument(null);
                  setIsPreviewExpanded(false);
                }} aria-label="Close document preview">
                  <X size={18} />
                </button>
              </div>
            </div>
            <div className="document-preview-stage">
              {canPreviewAsImage(selectedDocument) ? (
                <div
                  className="document-preview-image"
                  role="img"
                  aria-label={selectedDocument.name}
                  style={{ backgroundImage: `url(${selectedDocument.dataUrl})` }}
                />
              ) : canPreviewInFrame(selectedDocument) ? (
                <iframe
                  title={selectedDocument.name}
                  src={selectedDocument.dataUrl}
                />
              ) : (
                <div className="empty-state document-preview-fallback">
                  <FileText size={32} />
                  <p>This file type cannot be previewed directly in the browser.</p>
                  <a className="btn btn-secondary compact-btn" href={selectedDocument.dataUrl} download={selectedDocument.name}>
                    Download file
                  </a>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default SecureUploads;
