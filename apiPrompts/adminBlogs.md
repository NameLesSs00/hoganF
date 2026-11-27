AdminBlogs


GET
/api/admin/blogs



Parameters
Try it out
Name	Description
Search
string
(query)
Search
IsPublished
boolean
(query)

--
SortBy
string
(query)
SortBy
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
      "title": {
        "en": "string",
        "ar": "string"
      },
      "heroImageUrl": "string",
      "summary": {
        "en": "string",
        "ar": "string"
      },
      "isPublished": true,
      "publishedAt": "2026-11-27T09:58:53.009Z",
      "createdAt": "2026-11-27T09:58:53.009Z",
      "updatedAt": "2026-11-27T09:58:53.009Z",
      "sectionCount": 0,
      "pendingReviewCount": 0
    }
  ],
  "page": 0,
  "pageSize": 0,
  "totalCount": 0
}
No links

POST
/api/admin/blogs



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
TitleEn
string
TitleAr
string
SummaryEn
string
SummaryAr
string
HeroImage
string($binary)
IsPublished
boolean
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
  "title": {
    "en": "string",
    "ar": "string"
  },
  "heroImageUrl": "string",
  "summary": {
    "en": "string",
    "ar": "string"
  },
  "isPublished": true,
  "publishedAt": "2026-11-27T09:58:53.014Z",
  "createdAt": "2026-11-27T09:58:53.014Z",
  "updatedAt": "2026-11-27T09:58:53.014Z",
  "sections": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "title": {
        "en": "string",
        "ar": "string"
      },
      "contentHtml": {
        "en": "string",
        "ar": "string"
      },
      "orderNumber": 0
    }
  ],
  "reviewCounts": {
    "pending": 0,
    "approved": 0,
    "rejected": 0
  }
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

GET
/api/admin/blogs/{id}



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
  "title": {
    "en": "string",
    "ar": "string"
  },
  "heroImageUrl": "string",
  "summary": {
    "en": "string",
    "ar": "string"
  },
  "isPublished": true,
  "publishedAt": "2026-11-27T09:58:53.020Z",
  "createdAt": "2026-11-27T09:58:53.020Z",
  "updatedAt": "2026-11-27T09:58:53.020Z",
  "sections": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "title": {
        "en": "string",
        "ar": "string"
      },
      "contentHtml": {
        "en": "string",
        "ar": "string"
      },
      "orderNumber": 0
    }
  ],
  "reviewCounts": {
    "pending": 0,
    "approved": 0,
    "rejected": 0
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
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links

PUT
/api/admin/blogs/{id}



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
TitleEn
string
TitleAr
string
SummaryEn
string
SummaryAr
string
HeroImage
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
  "title": {
    "en": "string",
    "ar": "string"
  },
  "heroImageUrl": "string",
  "summary": {
    "en": "string",
    "ar": "string"
  },
  "isPublished": true,
  "publishedAt": "2026-11-27T09:58:53.027Z",
  "createdAt": "2026-11-27T09:58:53.027Z",
  "updatedAt": "2026-11-27T09:58:53.027Z",
  "sections": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "title": {
        "en": "string",
        "ar": "string"
      },
      "contentHtml": {
        "en": "string",
        "ar": "string"
      },
      "orderNumber": 0
    }
  ],
  "reviewCounts": {
    "pending": 0,
    "approved": 0,
    "rejected": 0
  }
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

DELETE
/api/admin/blogs/{id}



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

PATCH
/api/admin/blogs/{id}/publish



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
  "isPublished": true
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
  "title": {
    "en": "string",
    "ar": "string"
  },
  "heroImageUrl": "string",
  "summary": {
    "en": "string",
    "ar": "string"
  },
  "isPublished": true,
  "publishedAt": "2026-11-27T09:58:53.039Z",
  "createdAt": "2026-11-27T09:58:53.039Z",
  "updatedAt": "2026-11-27T09:58:53.039Z",
  "sections": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "title": {
        "en": "string",
        "ar": "string"
      },
      "contentHtml": {
        "en": "string",
        "ar": "string"
      },
      "orderNumber": 0
    }
  ],
  "reviewCounts": {
    "pending": 0,
    "approved": 0,
    "rejected": 0
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
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links

PUT
/api/admin/blogs/{id}/sections



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
  "sections": [
    {
      "title": {
        "en": "string",
        "ar": "string"
      },
      "contentHtml": {
        "en": "string",
        "ar": "string"
      },
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
    "title": {
      "en": "string",
      "ar": "string"
    },
    "contentHtml": {
      "en": "string",
      "ar": "string"
    },
    "orderNumber": 0
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