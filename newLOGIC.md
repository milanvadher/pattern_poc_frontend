# **Find Trending Triangle Logic (New)**

1. Get data from database.

2. Convert data to pd(pandas) formate.

3. Find `min_point` and `max_point` according to above logic, so we got like this -

    **i.e**

    ```python
    min_point = [value,value,value,...]

    max_point = [value,value,value,...]
    ```

## **Data Filteration from above data**

* Then according to min and max points, find date of that points and save in other variable. - So now we have `min_point` and `max_point` along with date & time. Now we have -

    **i.e**

    ```python
    min_point = [ [date,value], [date,value] , ... ]

    max_point = [ [date,value], [date,value] , ... ]
    ```

***

## **Now we find patterns**

* **For bottom line:**

     In this we take data from latest to past data.

     For pattern take last 10 value from `min_point` and add 1st value to `top_line` array, then compare remaining 9 values with 1st value and if that value is greter then 1st value then we add that in that array.

    _loop untill `min_point` length_

* **For top line:**

     In this also we take data from latest to past data.

     For pattern take last 10 value from `max_point` and add 1st value to `top_line` array, then compare remaining 9 values with 1st value and if that value is less then 1st value then we add that in that array.

    _loop untill `max_point` length_

* Now we have 2 sorted array of array

    **i.e**

    ```python
    top_line = [ [date,value],[date,value],... ]

    bottom_line = [ [date,value],[date,value],... ]
    ```

* Now for final part add 1st value from `top_line` add into `final_top_line` and for last point compare the last point's date of `top_line` & `bottom_line` and take largest date point and add to `final_top_line`.

    **i.e**

    ```python
    final_top_line = [[date,1225],[date,1102]]
    ```

* Now for final part add 1st value from `bottom_line` add into `final_bottom_line` and for last point compare the last point's date of `bottom_line` & `bottom_line` and take largest date point and add to `final_bottom_line`.
  
    **i.e**

    ```python
    final_bottom_line = [[date,1030],[date,1102]]
    ```

* _last point of `final_top_line` & `final_bottom_line` must be same._

* Then send `final_top_line` & `final_bottom_line` to user for display in frontend.