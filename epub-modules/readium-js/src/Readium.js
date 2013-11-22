
define(['require', 'module', 'jquery', 'underscore', 'backbone', 'epub_renderer/epub_renderer_module', 'epub_fetch/epub_fetch_module',
    'epub/epub_module'],
    function (require, module, $, _, Backbone, EpubRendererModule, EpubFetchModule, EpubModule) {
        /**
         * Creates an instance of the Readium.js object.
         *
         * @constructor
         * @param elementToBindReaderTo The document element to bind display of the reader to.
         * @param packageDocumentURL : The URL to the package document
         * @param jsLibDir The path (relative to the current document) in which dependant zip.js libraries can be found.
         * @param definitionCallback The callback function that asynchronously receives the object's public interface once it has been initialized (document has been parsed).
         */
        var Readium = function (elementToBindReaderTo, packageDocumentURL, jsLibDir, definitionCallback) {

            // -------------- Initialization of viewer ------------------ //
            var epubFetch = new EpubFetchModule({
                packageDocumentURL: packageDocumentURL,
                libDir: jsLibDir
            });

            var epub = new EpubModule(epubFetch, function () {

                var renderer = new EpubRendererModule(epubFetch, elementToBindReaderTo, epub.getPackageData());
                
                // Readium.js module api
                definitionCallback({

                    openBook : function () { 
                        return renderer.openBook();
                    },
                    openSpineItemElementCfi : function (idref, elementCfi) { 
                        return renderer.openSpineItemElementCfi(idref, elementCfi);
                    },
                    openSpineItemPage: function(idref, pageIndex) {
                        return renderer.openSpineItemPage(idref, pageIndex);
                    },
                    openPageIndex: function(pageIndex) {
                        return renderer.openPageIndex(pageIndex);
                    },
                    openPageRight : function () { 
                        return renderer.openPageRight();
                    },
                    openPageLeft : function () { 
                        return renderer.openPageLeft();
                    },
                    updateSettings : function (settingsData) {
                        return renderer.updateSettings(settingsData);
                    },
                    bookmarkCurrentPage : function () {
                        return renderer.bookmarkCurrentPage();
                    },
                    addSelectionHighlight: function(id, type) {
                        return renderer.addSelectionHighlight(id,type);
                    },
                    addSelectionImageAnnotation: function(id) {
                        return renderer.addSelectionImageAnnotation(id);
                    },

                    addSelectionBookmark: function(id, type) {
                        return renderer.addSelectionBookmark(id,type);
                    },
                    addHighlight : function (CFI, id, type) { 
                        return renderer.addHighlight(CFI, id, type); 
                    },
                    addBookmark : function (CFI, id, type) { 
                        return renderer.addBookmark(CFI, id, type);
                    },
                    addImageAnnotation : function (CFI, id) { 
                        return renderer.addImageAnnotation(CFI, id); 
                    },
                    showPageByCFI : function (CFI, callback, callbackContext) {
                        return renderer.showPageByCFI(CFI, callback, callbackContext);
                    },
                    getCurrentSelectionCFI:function() {
                        return renderer.getCurrentSelectionCFI();
                    },
                    getCurrentSelectionOffsetCFI:function() {
                        debugger;
                        return renderer.getCurrentSelectionOffsetCFI();
                    }
 
                });    
            });
        };

        // Note: the epubReadingSystem object may not be ready when directly using the
        // window.onload callback function (from within an (X)HTML5 EPUB3 content document's Javascript code)
        // To address this issue, the recommended code is:
        // -----
        console.log(navigator.epubReadingSystem);
        return Readium;
    });
