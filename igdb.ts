"use client"
import { useEffect, useState } from 'react';

export const fetchIGDBData = async () => {
  const response = await fetch('/api/igdb', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};
