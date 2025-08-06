import { useEffect, useState } from 'react';
import { getChannelOptions } from '@/apis/jike';

type PublishOptions = {
  id: string | number;
  name: string;
}

type Resp = {
  data: {
    channels: OptionItem;
  }
}
type OptionItem = PublishOptions[];
export default function useChannel() {
  const [options, setOptions] = useState<OptionItem>([]);
  useEffect(() => {
    const getOptionList = async () => {
      const res = await getChannelOptions() as Resp
      if (!res || !res.data) return
      setOptions(res.data.channels)
    }
    getOptionList()
  }, [])
  return { options }
}
