# Project CROMAI - Pessoa Dev de Software Jr.

### `ENDPOINTS`

#### `GET: ` /get-image?name=*name of the file*
- Request receiving the name of the image via query and returning file for download.
- For CURL tests, receiving only the response: "curl http://*localhost:xxxx*/get-image"
- For CURL tests, receiving response and headers: "curl -i http://*localhost:xxxx*/get-image"
#### `GET: ` /decode-message-from-image?name=*name of the file*
- Request receiving the name of the image via query and returning the hidden message.
- For CURL tests, receiving only the response: "curl http://*localhost:xxxx*/decode-message-from-image"
- For CURL tests, receiving response and headers: "curl -i http://*localhost:xxxx*/decode-message-from-image"
#### `POST: ` /upload
- Request receiving a bitmap image and returning the name of the file stored on a local temporary folder.
- For CURL tests: "http://*localhost:xxxx*/upload -d 'name: *name of the file*' "
#### `POST: ` /write-message-on-image
- Request receiving the path of the uploaded file and applying steganography algorithm.
- For CURL tests: "http://*localhost:xxxx*/write-message-on-image -d 'path=*path of the file*' "

**Note: localhost port used: 3003. The path of the file will be stored in your temporary local folder and it will look something like this: "C:\Users\user*\AppData\Local\Temp\1637257415583-big_brother_is_watching_u_original.bmp"**