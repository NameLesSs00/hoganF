AdminBrands


GET
/api/admin/brands



Parameters
Try it out
Name	Description
Search
string
(query)
Search
Usage
string
(query)
Usage
Accept-Language
string
(header)
Preferred language (en or ar). Defaults to en.

Available values : en, ar

Default value : en


en
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": {
      "en": "string",
      "ar": "string"
    },
    "logoUrl": "string",
    "createdAt": "2026-11-27T09:52:46.760Z",
    "motorcycleCount": 0,
    "sparePartCount": 0
  }
]
No links

POST
/api/admin/brands



Parameters
Try it out
Name	Description
Accept-Language
string
(header)
Preferred language (en or ar). Defaults to en.

Available values : en, ar

Default value : en


en
Request body

multipart/form-data
NameEn
string
NameAr
string
Logo
string($binary)
Responses
Code	Description	Links
201	
Created

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": {
    "en": "string",
    "ar": "string"
  },
  "logoUrl": "string",
  "createdAt": "2026-11-27T09:52:46.764Z",
  "motorcycleCount": 0,
  "sparePartCount": 0
}
No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links
409	
Conflict

Media type

application/json
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links

GET
/api/admin/brands/{id}



Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
id
Accept-Language
string
(header)
Preferred language (en or ar). Defaults to en.

Available values : en, ar

Default value : en


en
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": {
    "en": "string",
    "ar": "string"
  },
  "logoUrl": "string",
  "createdAt": "2026-11-27T09:52:46.769Z",
  "motorcycleCount": 0,
  "sparePartCount": 0
}
No links
404	
Not Found

Media type

application/json
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links

PUT
/api/admin/brands/{id}



Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
id
Accept-Language
string
(header)
Preferred language (en or ar). Defaults to en.

Available values : en, ar

Default value : en


en
Request body

multipart/form-data
NameEn
string
NameAr
string
Logo
string($binary)
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": {
    "en": "string",
    "ar": "string"
  },
  "logoUrl": "string",
  "createdAt": "2026-11-27T09:52:46.774Z",
  "motorcycleCount": 0,
  "sparePartCount": 0
}
No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links
404	
Not Found

Media type

application/json
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links
409	
Conflict

Media type

application/json
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links

DELETE
/api/admin/brands/{id}



Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
id
Accept-Language
string
(header)
Preferred language (en or ar). Defaults to en.

Available values : en, ar

Default value : en


en
Responses
Code	Description	Links
204	
No Content

No links
404	
Not Found

Media type

application/json
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links
409	
Conflict

Media type

application/json
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}