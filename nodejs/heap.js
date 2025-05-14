import v8 from 'v8'

console.log(v8.getHeapStatistics());

/*
{
  total_heap_size: 5799936,
  total_heap_size_executable: 262144,
  total_physical_size: 5799936,      
  total_available_size: 2194052136,
  used_heap_size: 4666960,
  heap_size_limit: 2197815296,
  malloced_memory: 172104,
  peak_malloced_memory: 106752,
  does_zap_garbage: 0,
  number_of_native_contexts: 2,
  number_of_detached_contexts: 0,
  total_global_handles_size: 8192,
  used_global_handles_size: 2752,
  external_memory: 1702903
}
*/