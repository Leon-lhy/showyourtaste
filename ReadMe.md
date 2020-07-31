## RESTful



| Name    | URL             | Verb   | Desc                            | db()                     |
| ------- | --------------- | ------ | ------------------------------- | ------------------------ |
| INDEX   | /shoes          | GET    | List all shoes                  | Shoe.find()              |
| NEW     | /shoes/new      | GET    | show new shoe form              | N/A                      |
| CREATE  | /shoes          | POST   | create a new shoe then redirect | Shoe.create()            |
| SHOW    | /shoes/:id      | GET    | show info about one shoe        | Shoe.findById()          |
| EDIT    | /shoes/:id/edit | GET    | edit original shoe Info         | Shoe.findById()          |
| UPDATE  | /shoes/:id      | POST   | update a dog then redirect      | Shoe.findByIdAndUpdate() |
| DESTROY | /shoes/:id      | DELETE | delete a dog then redirect      | Shoe.findByIdAndRemove() |



| Name    | URL                                  | Verb   | Desc                               | db()                              |
| ------- | ------------------------------------ | ------ | ---------------------------------- | --------------------------------- |
| NEW     | /shoes/:id/comments/new              | GET    | shoe new comment form              | Shoe.findById()                   |
| CREATE  | /shoes/:id/comments                  | POST   | create a new comment then redirect | Shoe.findById()  Comment.create() |
| EDIT    | /shoes/:id/comments/:comment_id/edit | GET    | shoe edit comment form             | Comment.findById()                |
| UPDATE  | /shoes/:id/comments/:comment_id      | POST   | update a comment then redirect     | Comment.findByIdAndUpdate()       |
| DESTROY | /shoes/:id/comments/:comment_id      | DELETE | delete a comment then redirect     | Comment.findByIdAndRemove()       |





## Database

##### Shoe:

- name
- image
- description



## Step

1. restfull pages of shoes, comments and db()
2. css
3. refactor
4. authentication