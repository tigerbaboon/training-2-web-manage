export const formatUnixTime = (unixTime: number): string => {
    // Unix Time เป็นวินาที ต้องคูณ 1000 เพื่อแปลงเป็นมิลลิวินาที
    const date = new Date(unixTime * 1000);
    // ตัวอย่างฟอร์แมตวันที่
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return date.toLocaleDateString('th-TH', options); // แปลงเป็นภาษาไทย
  };
  