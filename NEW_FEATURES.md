# New Features

* [ ] Pagination
  * Server
    * [ ] v2 mews endpoint
    * [ ] Skip and Limit from query params
      * [ ] Defaults: skip - 0, limit - 10
      * [ ] Include total count in response
    * [ ] Order by created date
  * Client
    * [ ] Skip and Limit variables
    * [ ] Remove .reverse()
    * [ ] Previous and Next Buttons
      * [ ] Hidden on page load
      * [ ] Only show previous button if skip > 0
      * [ ] Only show next button if skip + limit < count
      * [ ] Get next page on next button click
        * [ ] Set skip, limit
        * [ ] Disable button
        * [ ] Request mews
        * [ ] Enable button
        * [ ] hide / show buttons
      * [ ] Get previous page on previous button click
        * [ ] Set skip, limit
        * [ ] Disable button
        * [ ] Request mews
        * [ ] Enable button
        * [ ] hide / show buttons
* [ ] Search
  * Server
    * [ ] Add search param to /v2/mews query params
    * [ ] Update find options if search specified
  * Client
    * [ ] Add search input
    * [ ] Add search button
      * On click
        * [ ] Set search variable
        * [ ] List mews with search param
