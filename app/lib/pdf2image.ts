import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.mjs?url";

export interface PdfConversionResult {
  imageUrl: string;
  file: File | null;
  error?: string;
}

let pdfjsLib: any = null;
let isLoading = false;
let loadPromise: Promise<any> | null = null;

async function loadPdfJs(): Promise<any> {
  if (pdfjsLib) return pdfjsLib;
  if (loadPromise) return loadPromise;

  isLoading = true;
  // @ts-expect-error - pdfjs-dist/build/pdf.mjs is not a module
  loadPromise = import("pdfjs-dist/build/pdf.mjs").then((lib) => {
    // Set the worker source to use local file
    lib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;
    pdfjsLib = lib;
    isLoading = false;
    return lib;
  });

  return loadPromise;
}

export async function convertPdfToImage(
  file: File,
): Promise<PdfConversionResult> {
  try {
    // #region agent log convertPdfToImage:start
    fetch("http://127.0.0.1:7695/ingest/5451b786-e1f4-41b4-966f-643c4d142d0a", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "70a583",
      },
      body: JSON.stringify({
        sessionId: "70a583",
        runId: "debug_pre",
        hypothesisId: "H5",
        location: "app/lib/pdf2image.ts:convertPdfToImage:start",
        message: "convertPdfToImage:start",
        data: {
          name: file?.name,
          size: file?.size,
          type: file?.type,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion

    const lib = await loadPdfJs();

    // #region agent log pdfjsLoaded
    fetch("http://127.0.0.1:7695/ingest/5451b786-e1f4-41b4-966f-643c4d142d0a", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "70a583",
      },
      body: JSON.stringify({
        sessionId: "70a583",
        runId: "debug_pre",
        hypothesisId: "H1",
        location: "app/lib/pdf2image.ts:loadPdfJs:after",
        message: "pdfjsLoaded",
        data: {
          workerSrc: lib?.GlobalWorkerOptions?.workerSrc,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion

    const arrayBuffer = await file.arrayBuffer();

    // #region agent log pdfArrayBufferReady
    fetch("http://127.0.0.1:7695/ingest/5451b786-e1f4-41b4-966f-643c4d142d0a", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "70a583",
      },
      body: JSON.stringify({
        sessionId: "70a583",
        runId: "debug_pre",
        hypothesisId: "H5",
        location: "app/lib/pdf2image.ts:arrayBufferReady",
        message: "pdfArrayBufferReady",
        data: {
          byteLength: arrayBuffer?.byteLength,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion

    const pdf = await lib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1);

    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    if (context) {
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
    }

    // #region agent log beforePageRender
    fetch("http://127.0.0.1:7695/ingest/5451b786-e1f4-41b4-966f-643c4d142d0a", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "70a583",
      },
      body: JSON.stringify({
        sessionId: "70a583",
        runId: "debug_pre",
        hypothesisId: "H3",
        location: "app/lib/pdf2image.ts:beforePageRender",
        message: "beforePageRender",
        data: {
          viewportW: viewport?.width,
          viewportH: viewport?.height,
          hasContext: !!context,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion

    await page.render({ canvasContext: context!, viewport }).promise;

    // #region agent log pageRenderSuccess
    fetch("http://127.0.0.1:7695/ingest/5451b786-e1f4-41b4-966f-643c4d142d0a", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "70a583",
      },
      body: JSON.stringify({
        sessionId: "70a583",
        runId: "debug_pre",
        hypothesisId: "H3",
        location: "app/lib/pdf2image.ts:pageRenderSuccess",
        message: "pageRenderSuccess",
        data: {
          viewportW: viewport?.width,
          viewportH: viewport?.height,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          // #region agent log toBlobResult
          fetch(
            "http://127.0.0.1:7695/ingest/5451b786-e1f4-41b4-966f-643c4d142d0a",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Debug-Session-Id": "70a583",
              },
              body: JSON.stringify({
                sessionId: "70a583",
                runId: "debug_pre",
                hypothesisId: "H4",
                location: "app/lib/pdf2image.ts:toBlobResult",
                message: "toBlobResult",
                data: {
                  blobSize: blob?.size ?? 0,
                  blobType: blob?.type ?? "",
                  hasBlob: !!blob,
                },
                timestamp: Date.now(),
              }),
            },
          ).catch(() => {});
          // #endregion

          if (blob) {
            // Create a File from the blob with the same name as the pdf
            const originalName = file.name.replace(/\.pdf$/i, "");
            const imageFile = new File([blob], `${originalName}.jpg`, {
              type: "image/jpeg",
            });

            resolve({
              imageUrl: URL.createObjectURL(blob),
              file: imageFile,
            });
          } else {
            resolve({
              imageUrl: "",
              file: null,
              error: "Failed to create image blob",
            });
          }
        },
        "image/jpeg",
        0.8,
      ); // Set quality to maximum (1.0)
    });
  } catch (err) {
    // #region agent log convertPdfToImageError
    fetch("http://127.0.0.1:7695/ingest/5451b786-e1f4-41b4-966f-643c4d142d0a", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "70a583",
      },
      body: JSON.stringify({
        sessionId: "70a583",
        runId: "debug_pre",
        hypothesisId: "H2",
        location: "app/lib/pdf2image.ts:catch",
        message: "convertPdfToImageError",
        data: {
          name: (err as any)?.name,
          message: (err as any)?.message,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion

    const errName = err instanceof Error ? err.name : (err as any)?.name;
    const errMessage = err instanceof Error ? err.message : String(err);
    return {
      imageUrl: "",
      file: null,
      error: `Failed to convert PDF (${errName ?? "Error"}): ${errMessage}`,
    };
  }
}
