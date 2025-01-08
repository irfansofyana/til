---
layout: post
title: "SQL Window Functions"
date: 2024-11-15
category: SQL
tags: [sql, database, data-analysis]
description: Using SQL window functions to perform calculations across rows without grouping them together.
---

Window functions let you access other rows while keeping your original rows:

```sql
SELECT 
  department,
  employee_name,
  salary,
  AVG(salary) OVER (PARTITION BY department) as dept_avg,
  salary - AVG(salary) OVER (PARTITION BY department) as diff_from_avg
FROM employees;
```

Perfect for comparing values to aggregates!
