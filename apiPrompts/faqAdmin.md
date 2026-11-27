AdminFaqs


GET
/api/admin/faqs



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
    "question": {
      "en": "string",
      "ar": "string"
    },
    "answer": {
      "en": "string",
      "ar": "string"
    },
    "orderNumber": 0,
    "isActive": true,
    "createdAt": "2026-11-27T09:42:40.189Z",
    "updatedAt": "2026-11-27T09:42:40.189Z"
  }
]
No links

POST
/api/admin/faqs



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
  "question": {
    "en": "string",
    "ar": "string"
  },
  "answer": {
    "en": "string",
    "ar": "string"
  },
  "orderNumber": 0,
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
  "question": {
    "en": "string",
    "ar": "string"
  },
  "answer": {
    "en": "string",
    "ar": "string"
  },
  "orderNumber": 0,
  "isActive": true,
  "createdAt": "2026-11-27T09:42:40.193Z",
  "updatedAt": "2026-11-27T09:42:40.193Z"
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
  "message": "string",
  "detail": "string",
  "instance": "string",
  "traceId": "string",
  "errors": {
    "additionalProp1": [
      "string"
    ],
    "additionalProp2": [
      "string"
    ],
    "additionalProp3": [
      "string"
    ]
  }
}
No links

GET
/api/admin/faqs/{id}



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
  "question": {
    "en": "string",
    "ar": "string"
  },
  "answer": {
    "en": "string",
    "ar": "string"
  },
  "orderNumber": 0,
  "isActive": true,
  "createdAt": "2026-11-27T09:42:40.197Z",
  "updatedAt": "2026-11-27T09:42:40.197Z"
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
  "message": "string",
  "detail": "string",
  "instance": "string",
  "traceId": "string",
  "errors": {
    "additionalProp1": [
      "string"
    ],
    "additionalProp2": [
      "string"
    ],
    "additionalProp3": [
      "string"
    ]
  }
}
No links

PUT
/api/admin/faqs/{id}



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
  "question": {
    "en": "string",
    "ar": "string"
  },
  "answer": {
    "en": "string",
    "ar": "string"
  },
  "orderNumber": 0,
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
  "question": {
    "en": "string",
    "ar": "string"
  },
  "answer": {
    "en": "string",
    "ar": "string"
  },
  "orderNumber": 0,
  "isActive": true,
  "createdAt": "2026-11-27T09:42:40.203Z",
  "updatedAt": "2026-11-27T09:42:40.203Z"
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
  "message": "string",
  "detail": "string",
  "instance": "string",
  "traceId": "string",
  "errors": {
    "additionalProp1": [
      "string"
    ],
    "additionalProp2": [
      "string"
    ],
    "additionalProp3": [
      "string"
    ]
  }
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
  "message": "string",
  "detail": "string",
  "instance": "string",
  "traceId": "string",
  "errors": {
    "additionalProp1": [
      "string"
    ],
    "additionalProp2": [
      "string"
    ],
    "additionalProp3": [
      "string"
    ]
  }
}
No links

DELETE
/api/admin/faqs/{id}



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
  "message": "string",
  "detail": "string",
  "instance": "string",
  "traceId": "string",
  "errors": {
    "additionalProp1": [
      "string"
    ],
    "additionalProp2": [
      "string"
    ],
    "additionalProp3": [
      "string"
    ]
  }
}
No links

PATCH
/api/admin/faqs/{id}/active



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
  "question": {
    "en": "string",
    "ar": "string"
  },
  "answer": {
    "en": "string",
    "ar": "string"
  },
  "orderNumber": 0,
  "isActive": true,
  "createdAt": "2026-11-27T09:42:40.213Z",
  "updatedAt": "2026-11-27T09:42:40.213Z"
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
  "message": "string",
  "detail": "string",
  "instance": "string",
  "traceId": "string",
  "errors": {
    "additionalProp1": [
      "string"
    ],
    "additionalProp2": [
      "string"
    ],
    "additionalProp3": [
      "string"
    ]
  }
}
No links

PUT
/api/admin/faqs/reorder



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
  "items": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "orderNumber": 0
    }
  ]
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
[
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "question": {
      "en": "string",
      "ar": "string"
    },
    "answer": {
      "en": "string",
      "ar": "string"
    },
    "orderNumber": 0,
    "isActive": true,
    "createdAt": "2026-11-27T09:42:40.218Z",
    "updatedAt": "2026-11-27T09:42:40.218Z"
  }
]
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
  "message": "string",
  "detail": "string",
  "instance": "string",
  "traceId": "string",
  "errors": {
    "additionalProp1": [
      "string"
    ],
    "additionalProp2": [
      "string"
    ],
    "additionalProp3": [
      "string"
    ]
  }
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
  "message": "string",
  "detail": "string",
  "instance": "string",
  "traceId": "string",
  "errors": {
    "additionalProp1": [
      "string"
    ],
    "additionalProp2": [
      "string"
    ],
    "additionalProp3": [
      "string"
    ]
  }
}