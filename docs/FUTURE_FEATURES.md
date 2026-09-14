# Future features

These ideas extend the modernization. They are not active services, provider
selections, confirmed prices, or commitments to sell anything yet.

## Membership interest and signup

Start with a short "Ask about membership" form so interested visitors can begin
a conversation. Suggested fields: name, email or phone, preferred contact method,
adult/kids program interest, and an optional message. For a children's program,
collect a parent/guardian's contact details rather than unnecessary child data.

The confirmation should explain that an inquiry was received and membership is
not yet active. Do not promise an unconfirmed response time, class reservation,
free trial, price, or automatic enrollment.

Two implementation options: a hosted form linked from the site, or a custom form
posting to a small backend. A hosted form reduces implementation work; a custom
form gives more control over branding and behavior. Choose after confirming who
receives inquiries and how the operator will review them from a phone.

Before launch: establish a private destination, minimal retention period, spam
protection/rate limiting, server-side validation, delivery error handling, and
accessible field errors. Show success only after the submission is accepted.
Do not store submissions in a public repository or public calendar. Any marketing
opt-in should be separate from the inquiry.

Full online enrollment is a later project: confirm plans, prices, effective dates,
waivers, guardian requirements, payment terms, cancellation handling, and the
operator's existing membership system. Reuse a suitable hosted membership/payment
service if one exists. A signup form alone is not a membership management system.

## Contact options

Initial modernization can improve existing call, email, map, and social links.
Verify the destination numbers, inbox, address, and actual social account before
publication. Keep the primary mobile action easy to reach without covering content.

Future options include the same inquiry form with a topic selector (classes,
membership, private training, merchandise), text messaging if the operator wants
it, and a private-training request. Label a request clearly; it is not a confirmed
appointment. Only advertise channels someone will actually monitor.

## Merchandise possibilities

The repository already contains `resources/photos/merchandise/`. Review those
photos with the operator to learn which products, if any, are currently sold.
Do not infer stock, sizes, prices, or availability from historical photos.

| Stage | Visitor experience | Owner decisions needed |
| --- | --- | --- |
| Showcase | Browse current products and ask at the gym | Actual products, current photos, whether to publish prices |
| Reservation / pickup inquiry | Request an item and size for gym pickup | Who confirms stock, pickup process, how unavailable items are handled |
| Hosted checkout | Pay through a selected commerce provider | Catalog/variants, stock control, payment setup, pickup/shipping, refunds |
| Full storefront | Browse, purchase, track fulfillment | Whether demand justifies inventory, order, and support operations |

Recommend a small showcase or pickup inquiry first if there is real inventory and
interest. Keep checkout hosted by the eventual payment provider. Do not collect
card data in a site form. If order state is added, confirm payment server-side;
the browser returning from checkout is not proof of payment.

## Other backlog candidates

- Beginner FAQ: what to bring, what a first session looks like, and how to choose a class.
- Public announcements for seminars and holiday schedule changes, ideally maintained through the calendar.
- A private-training request flow once the operator's booking process is known.
- Basic privacy-conscious measurement of schedule views and contact clicks.

Prioritize features that fit the operator's existing phone workflow. Avoid a
separate administrative dashboard unless a concrete need emerges.
