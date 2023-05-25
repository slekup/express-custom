# Express Custom

# Getting Started

### Install

```bash
npm install express-custom
```

### Usage

```ts
import express from 'express-custom';

const app = express();

import custom from 'express-custom';

app.use(
  custom({
    // options
  })
);

app.listen(3000);
```

### Debug

Set the environment variable `DEBUG_EXPRESS_CUSTOM` to true to see debug messages.
