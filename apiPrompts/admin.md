AdminUsers


GET
/api/admin/users



Parameters
Try it out
Name	Description
Search
string
(query)
Search
IsActive
boolean
(query)

--
Page
integer($int32)
(query)
Page
PageSize
integer($int32)
(query)
PageSize
Skip
integer($int32)
(query)
Skip
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
  "items": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "email": "string",
      "firstName": "string",
      "lastName": "string",
      "isActive": true,
      "createdAt": "2026-11-27T09:10:43.899Z",
      "roles": [
        "string"
      ]
    }
  ],
  "page": 0,
  "pageSize": 0,
  "totalCount": 0
}
No links

POST
/api/admin/users



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

application/json
Example Value
Schema
{
  "email": "string",
  "password": "string",
  "firstName": "string",
  "lastName": "string",
  "isActive": true
}
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
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "isActive": true,
  "createdAt": "2026-11-27T09:10:43.902Z",
  "roles": [
    "string"
  ]
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
/api/admin/users/{id}



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
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "isActive": true,
  "createdAt": "2026-11-27T09:10:43.908Z",
  "roles": [
    "string"
  ]
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
/api/admin/users/{id}



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

application/json
Example Value
Schema
{
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "isActive": true,
  "newPassword": "string"
}
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
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "isActive": true,
  "createdAt": "2026-11-27T09:10:43.914Z",
  "roles": [
    "string"
  ]
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
/api/admin/users/{id}



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
No links

PATCH
/api/admin/users/{id}/active



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

application/json
Example Value
Schema
{
  "isActive": true
}
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
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "isActive": true,
  "createdAt": "2026-11-27T09:10:43.926Z",
  "roles": [
    "string"
  ]
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