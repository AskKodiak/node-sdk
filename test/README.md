# Testing This Library

node-sdk uses  Mocha/Chai unit tests. To run them, first create a file in this directory called `askkodiakrc.json`. It should include your api credentials and a test product id that is rich with data including rules to be used in verification. here's the format:

```json
{
  "gid": "-L63MMnnhjsuw2xBNHat-",
  "key": "ee64f5d24f7c0cNN9648dd7426649c28779929d072637df2"
}
```

Once you have created `askkodiakrc.json`, from the debug tab in Visual Studio code choose the **Mocha Tests** launch target.
