import React, { useState, useEffect } from 'react';
import Quagga from 'quagga';
/*
 * 9781937006792 -Inside the now
 */
function isValidISBN(isbn) {
    isbn = isbn.replace(/[^\dX]/g, ''); // Remove any non-numeric characters except 'X'
  
    if (isbn.length !== 10 && isbn.length !== 13) {
      return false; // ISBN should be either 10 or 13 characters long
    }
  
    if (isbn.length === 10) {
      // Check for ISBN-10
      let checksum = 0;
      for (let i = 0; i < 9; i++) {
        if (isNaN(isbn[i])) {
          return false; // ISBN-10 should have 'X' only at the last position
        }
        checksum += (10 - i) * parseInt(isbn[i]);
      }
      checksum = (11 - (checksum % 11)) % 11;
      return (isbn[9] === 'X' && checksum === 10) || (isbn[9] === checksum.toString());
    }
  
    if (isbn.length === 13) {
        if (isbn.substring(0, 3) !== '978' && isbn.substring(0, 3) !== '979') {
            return false; // ISBN-13 should start with '978' or '979'
        }

      // Check for ISBN-13
      let checksum = 0;
      for (let i = 0; i < 12; i++) {
        if (isNaN(isbn[i])) {
          return false; // ISBN-13 should not contain non-numeric characters
        }
        checksum += (i % 2 === 0) ? parseInt(isbn[i]) : parseInt(isbn[i]) * 3;
      }
      checksum = 10 - (checksum % 10);
      return isbn[12] === (checksum === 10 ? '0' : checksum.toString());
    }
  }

const BarcodeScanner = () => {
    const [latestScan, setLatestScan] = useState();
    const [foundISBN, setFoundISBN] = useState();
    useEffect(() => {
        Quagga.init({
            debug: true,
            locate: true,
            inputStream: {
                name: 'Live',
                type: 'LiveStream',
                target: document.querySelector('#barcode-scanner'), // DOM element to attach the camera stream
            },
            decoder: {
                readers: ['ean_reader'],  // You can change this to the desired barcode format
                multiple: false
            },
        }, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            Quagga.start();
        });
        Quagga.onProcessed(function(result) {
            var drawingCtx = Quagga.canvas.ctx.overlay,
                drawingCanvas = Quagga.canvas.dom.overlay;
    
            if (result) {
                if (result.boxes) {
                    drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                    result.boxes.filter(function (box) {
                        return box !== result.box;
                    }).forEach(function (box) {
                        Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "green", lineWidth: 2});
                    });
                }
    
                if (result.box) {
                    Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: "#00F", lineWidth: 2});
                }
    
                if (result.codeResult && result.codeResult.code) {
                    Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3});
                }
            }
        });

        Quagga.onDetected((data) => {
            const code = data.codeResult.code;

            if (isValidISBN(code)) {
                setLatestScan(code);
                setFoundISBN(code)

            }

            console.log('Barcode detected and processed', code);
            // Handle the barcode result here
            // Quagga.stop();
        });

        return () => {
            Quagga.stop();
        };
    }, []);

    return <>Hi<BookDetails isbn={foundISBN} /><div>{latestScan}</div><div id="barcode-scanner" style={{ width: '100%', height: '100vh' }}></div></>;
};


const BookDetails = ({isbn}) => {
    const [bookInfo, setBookInfo] = useState(null);
  
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
        if (response.ok) {
          const data = await response.json();
          if (data.items && data.items.length > 0) {
            const book = {
              title: data.items[0].volumeInfo.title,
              author: data.items[0].volumeInfo.authors ? data.items[0].volumeInfo.authors[0] : "Author not available",
              description: data.items[0].volumeInfo.description || "Description not available"
              // Include more details as needed
            };
            setBookInfo(book);
          } else {
            setBookInfo({ error: "Book not found" });
          }
        } else {
          throw new Error('Failed to fetch book details');
        }
      } catch (error) {
        console.error('Error fetching book details:', error);
        setBookInfo({ error: "Failed to fetch book details" });
      }
    };
  
    const handleScan = () => {
      // Simulating scanned ISBN
      const scannedISBN = '9781937006792'; // Replace this with the actual scanned ISBN
  
    //   setIsbn(scannedISBN);
      fetchBookDetails();
    };
  
    return (
      <div>
        <button onClick={handleScan}>Simulate Scan</button>
        {bookInfo && bookInfo.error ? (
          <p>{bookInfo.error}</p>
        ) : bookInfo ? (
          <div>
            <h2>Title: {bookInfo.title}</h2>
            <p>Author: {bookInfo.author}</p>
            <p>Description: {bookInfo.description}</p>
            {/* Display more details if needed */}
          </div>
        ) : (
          <p>No book information available</p>
        )}
      </div>
    );
  };

export default BarcodeScanner;